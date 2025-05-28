const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        isCompleted:{
            type: Boolean,
            require: true,
            default:false
        },

    }
);

const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;