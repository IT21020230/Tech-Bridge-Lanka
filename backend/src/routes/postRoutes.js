const express = require("express");

const multer = require('multer');
const uploadMiddleware = multer({ dest: "uploads/" });

// const requireAuth = require("../middlewares/requireAuth");


const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  acceptPost,
 
 getPostByStatus
} = require("../controllers/postController");

const router = express.Router();


// router.use(requireAuth);

// GET all posts
router.get("/post", getPosts);

// CREATE new post
router.post("/post", uploadMiddleware.single("file"), addPost);

// UPDATE new post
router.put("/post", uploadMiddleware.single("file"), updatePost);

// GET single post
router.get("/post/:id", getPost);

//Accept Post
router.patch("/post/accept/:id", acceptPost)

//get post by status
router.get("/post/get-post-by-status/:status", getPostByStatus)



module.exports = router;