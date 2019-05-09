const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Post model
const Post = require("../../models/Todos")

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Todos Route work" }))

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
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
    handle: req.body.handle
  })
  newPost.save().then(post => res.json(post))
})

// @route   DELETE api/post/:id
// @desc    Delete post
// @access  Private

router.delete("/:id", (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Delete post
        post.remove().then(() => res.json({ success: true }))
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }))
  })
})

module.exports = router
