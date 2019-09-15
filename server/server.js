const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

const app = express();
const mongoose = require("mongoose");
const async = require("async")
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Models
const { User } = require("./models/user");
const { Brand } = require("./models/brand");
const { Wood } = require("./models/wood");
const { Product } = require("./models/product");
const { Payment } = require("./models/payment");
const { Site } = require("./models/site");

// Middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

/*------------------------------- USERS -------------------------------*/

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // Find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        msg: "Auth failed, email not found."
      });

    // Check password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, msg: "Wrong password." });

      // Generate a token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).send({ logoutSuccess: true });
  });
});

app.post("/api/users/add_to_basket", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;
    doc.cart.forEach(item => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });
    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/remove_from_basket", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let cart = doc.cart;
    let array = cart.filter(item => item.id == req.query.productId);
    if (array[0].quantity === 1) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId)
            }
          }
        },
        { new: true },
        (err, doc) => {
          let cart = doc.cart;
          let array = cart.map(item => {
            return mongoose.Types.ObjectId(item.id);
          });
          Product.find({ _id: { $in: array } })
            .populate("brand")
            .populate("wood")
            .exec((err, cartData) => {
              return res.status(200).json({
                cartData,
                cart
              });
            });
        }
      );
    } else {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        },
        { $inc: { "cart.$.quantity": -1 } },
        { new: true },
        (err, doc) => {
          let cart = doc.cart;
          let array = cart.map(item => {
            return mongoose.Types.ObjectId(item.id);
          });
          Product.find({ _id: { $in: array } })
            .populate("brand")
            .populate("wood")
            .exec((err, cartData) => {
              return res.status(200).json({
                cartData,
                cart
              });
            });
        }
      );
    }
  });
});


app.post("/api/users/success_purchase", auth, (req, res) => {
  let purchaseHistory = [];
  let transactionData = {};

  req.body.cartData.forEach(item => {
    purchaseHistory.push({
      purchaseDate: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    })
  })

  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = purchaseHistory;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: purchaseHistory }, $set: { cart: [] }},
    { new: true },
    (err,user) => {
      if(err) return res.json({sucess: false, err});

      const payment = new Payment(transactionData);
      payment.save((err,pay) => {
        if(err) return res.json({ success:false, err });

        let products = [];
        pay.product.forEach(p => {
          products.push({
            id: p.id,
            quantity: p.quantity,
          })
        })

        async.eachSeries(products, (p, callback) => {
          Product.update(
            {_id: p.id},
            {$inc: {
              "sold": p.quantity
            }},
            {new: false},
            callback
          )
        }, (err) => {
          if(err) return res.json({ success:false, err });
          res.status(200).json({
            success: true,
            cart: user.cart,
            cartData: []
          })
        })
      })
    }
  )
});

app.post("/api/users/update_profile", auth, (req, res) => {

  User.findOneAndUpdate(
    {_id: req.user._id},
    { "$set": req.body },
    { new: true },
    (err, usr) => {
      if(err) return res.json({success: error, err});
      return res.status(200).send({
        success: true
      })
    }
  )
})


/*------------------------------- PRODUCTS -------------------------------*/
app.get("/api/product/items", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 50;

  Product.find()
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, items) => {
      if (err) return res.status(400).send(err);
      res.send(items);
    });
});

app.get("/api/product/items_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = items.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs["publish"] = true;

  Product.find(findArgs)
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: products.length,
        products
      });
    });
});

app.post("/api/product/item", auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      product: doc
    });
  });
});

app.post("/api/product/upload_image", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

app.get("/api/product/remove_image", auth, admin, (req, res) => {
  let img_id = req.query.public_id;
  cloudinary.uploader.destroy(img_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send("Image deleted successfully.");
  });
});

/*------------------------------- BRANDS -------------------------------*/

app.post("/api/product/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, brand: doc });
  });
});

app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

app.delete("/api/product/brand", auth, admin, (req, res) => {
  Brand.findOneAndRemove({ _id: req.query.id }, (err, brand) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, brand });
  });
});

/*------------------------------- WOODS -------------------------------*/

app.post("/api/product/wood", auth, admin, (req, res) => {
  const wood = new Wood(req.body);

  wood.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, wood: doc });
  });
});

app.get("/api/product/woods", (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(woods);
  });
});

app.delete("/api/product/wood", auth, admin, (req, res) => {
  Wood.findOneAndRemove({ _id: req.query.id }, (err, wood) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, wood });
  });
});

/*------------------------------- SITE -------------------------------*/

app.get("/api/site/site_data", (req, res) => {
  Site.find({}, (err,site) => {
    if(err) return res.status(400).send(err);
    res.status(200).send(site[0].siteInfo)
  })
})

app.post("/api/site/site_data", auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    {name: "site"},
    {"$set": { siteInfo: req.body }},
    {new: true},
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, siteInfo: doc.siteInfo });
    }
  )
})



////////////////////////////////////////////////////

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
