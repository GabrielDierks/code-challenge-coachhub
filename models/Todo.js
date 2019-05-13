const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  checked: {
    type: Boolean
  },
  date: {
    type: Date
  }
})

module.exports = Todo = mongoose.model("todo", TodoSchema)
