const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Todos model
const Todo = require("../../models/Todo")

// @route   GET api/todos/test
// @desc    Tests todos route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "todos route works" }))

// @route   GET api/todos
// @desc    Get todos
// @access  Public
router.get("/", (req, res) => {
  Todo.find()
    .sort({ _id: -1 })
    .then(todos => res.json(todos))
    .catch(err =>
      res.status(404).json({
        notodosfound: "There are no todos, be the first to post something!"
      })
    )
})

// @route   POST api/todos
// @desc    Create Todo
// @access  Public
router.post("/", (req, res) => {
  const newTodo = new Todo({
    name: req.body.name,
    description: req.body.description,
    checked: req.body.checked
  })
  newTodo.save().then(todo => res.json(todo))
})

// @route   POST api/todos/:id
// @desc    Check Todo
// @access  Public
router.put("/:id", (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .updateOne({ checked: !req.body.check })
    .then(todo => res.json(todo))
    .catch(err => res.status(404).json({ todonotfound: "No todo found" }))
})

// @route   DELETE api/todos/:id
// @desc    Delete Todo
// @access  Public
router.delete("/:id", (req, res) => {
  Todo.findOne({ _id: req.params.id }).then(todos =>
    todos
      .remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ todonotfound: "No todo found" }))
  )
})

module.exports = router
