const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Post model
const Post = require("../../models/Todos")

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Todos route works" }))

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({
        nopostsfound: "There are no posts, be the first to post something!"
      })
    )
})

// @route   POST api/posts
// @desc    Create post
// @access  Public
router.post("/", (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    title: req.body.text,
    text: req.body.name
  })
  newPost.save().then(post => res.json(post))
})

// @route   DELETE api/post/:id
// @desc    Delete post
// @access  Private

router.delete("/:id", (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(post => {
      // Delete post
      post.remove().then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ todonotfound: "No todo found" }))
})

module.exports = router
