const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    // isDone: Boolean
})

const user = mongoose.model('User', userSchema);
const todo = mongoose.model('Todo', todoSchema);

module.exports = {
    user,
    todo
}