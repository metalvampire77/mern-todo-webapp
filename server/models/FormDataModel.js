const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const FormModel = new mongoose.model("form", FormSchema);

module.exports = FormModel;
