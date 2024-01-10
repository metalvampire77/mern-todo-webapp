const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const FormModel = require("../models/FormDataModel");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(name, email, subject, message);

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.TO_MAIL,
    subject: subject,
    text: `name: ${name} , email: ${email}, , subject: ${subject},message : ${message}`,
  };

  FormModel.create(req.body).then((user) => res.json(user));

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
});

module.exports = { sendEmail };
