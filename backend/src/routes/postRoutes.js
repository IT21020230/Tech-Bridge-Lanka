const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
// const authMiddleware = require("../middlewares/auth");
// const adminMiddleware = require("../middlewares/admin");

// Create post route
router.post(
  "/posts",
  authMiddleware.authenticateToken,
  postController.createPost
);

// Edit post route
router.put(
  "/posts/:postId",
  //   authMiddleware.authenticateToken,
  postController.editPost
);

// Remove post route
router.delete(
  "/posts/:postId",
//   authMiddleware.authenticateToken,
  postController.removePost
);

// Approve post route
router.patch(
  "/posts/:postId/approve",
//   authMiddleware.authenticateToken,
//   adminMiddleware.isAdmin,
  postController.approvePost
);

// Reject post route
router.patch(
  "/posts/:postId/reject",
//   authMiddleware.authenticateToken,
//   adminMiddleware.isAdmin,
  postController.rejectPost
);

module.exports = router;
