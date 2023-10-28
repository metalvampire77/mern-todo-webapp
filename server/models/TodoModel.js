const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
  todo: String,
  user_id: String,
  done: {
    type: Boolean,
    default: false,
  },
});

const TodoModel = new mongoose.model("todos", TodosSchema);

module.exports = TodoModel;
