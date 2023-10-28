const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const TodosSchema = new mongoose.Schema({
    todo: String,
    user_id: String
})

const UserModel = new mongoose.model('users',UserSchema)
const TodoModel = new mongoose.model('todos',TodosSchema)

module.exports = UserModel,TodoModel