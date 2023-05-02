const Post = require("../models/post");
const multer = require("multer");

// Configure Multer middleware for cover image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).single("coverImage");

// Create post controller
exports.createPost = async (req, res) => {
  const { title, intro, description, publishedCommunity } = req.body;
  const author = req.user._id;
  try {
    // Upload cover image
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error uploading cover image" });
      }
      const coverImage = req.file.filename;
      const post = await Post.create({
        title,
        intro,
        coverImage,
        description,
        publishedCommunity,
        author,
      });
      res.status(201).json({ post });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating post" });
  }
};

// Edit post controller
exports.editPost = async (req, res) => {
  const { postId } = req.params;
  const { title, intro, description, publishedCommunity } = req.body;
  try {
    // Upload cover image
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error uploading cover image" });
      }
      const coverImage = req.file ? req.file.filename : undefined;
      const post = await Post.findByIdAndUpdate(
        postId,
        { title, intro, coverImage, description, publishedCommunity },
        { new: true }
      );
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json({ post });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error editing post" });
  }
};

// Remove post controller
exports.removePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    // Delete cover image
    if (post.coverImage) {
      fs.unlink(`uploads/${post.coverImage}`, (err) => {
        if (err) console.error(err);
      });
    }
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting post" });
  }
};

// Approve post controller
exports.approvePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { status: "approved" },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error approving post" });
  }
};

// Reject post controller
exports.rejectPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { status: "rejected" },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error rejecting post" });
  }
};
