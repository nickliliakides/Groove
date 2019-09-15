let admin = (req, res, next) => {
  if(req.user.role === 0){
    return res.send('Sorry you don\'t have admin rights to add data')
  }
  next();
}

module.exports = { admin }