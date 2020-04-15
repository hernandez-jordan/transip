const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true,  
  },
  versionKey: false // You should be aware of the outcome after set to false
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
