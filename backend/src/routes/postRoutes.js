const express = require("express");
const multer = require('multer');
const uploadMiddleware = multer({ dest: "uploads/" });

const {
  getPosts,
  getPost,
  addPost,
  updatePost,
} = require("../controllers/postController");

const router = express.Router();

// GET all posts
router.get("/post", getPosts);

// CREATE new post
router.post("/post", uploadMiddleware.single("file"), addPost);

// UPDATE new post
router.put("/post", uploadMiddleware.single("file"), updatePost);

// GET single post
router.get("/post/:id", getPost);

module.exports = router;
