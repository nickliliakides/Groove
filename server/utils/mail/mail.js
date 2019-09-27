const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
require('dotenv').config();

const getEmailData = (to, name, token, type) => {
  let data = null;

  switch(type){
  case "welcome":
    data = {
      from: "hermeswebdev@yahoo.com",
      to,
      subject: `Welcome to Groove ${name}!`,
      html: welcome()
    }
  default:
    data;
  }

  return data;
}

const sendEmail = (to, name, token, type) => {
 const smtpTransport = mailer.createTransport({
   service: "Yahoo",
   auth: {
     user: "hermeswebdev@yahoo.com",
     pass: process.env.EMAIL_PASS
   }
 })

 const mail = getEmailData(to, name, token, type)

  smtpTransport.sendMail(mail, (err, res) => {
  if(err){
    console.log(err)
  } else {
    console.log('email sent')
  }
  smtpTransport.close();
 })
}

module.exports = { sendEmail }