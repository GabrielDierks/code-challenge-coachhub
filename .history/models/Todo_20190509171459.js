const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  }
})

module.exports = Todo = mongoose.model("todo", TodoSchema)
