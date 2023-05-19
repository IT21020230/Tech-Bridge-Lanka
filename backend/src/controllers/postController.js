const Post = require("../models/postModel");

const fs = require('fs');

const addPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content, author, community } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
    community,
    author,
  });
  res.json(postDoc);
};

const updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { id, title, summary, content, community } = req.body;
    const postDoc = await Post.findById(id);
    await postDoc.update({
      title,
      summary,
      content,
      community,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
};

const getPosts = async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};

const acceptPost = async(req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        post.status = "Accepted";
        
    
        const acceptedPost = await post.save();
    
        res.json(acceptedPost);
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
}

const getPostByStatus = async(req, res) => {
  const post = await Post.find({ status: req.params.status });
  res.status(200).json(post);
}



module.exports = {
  addPost,
  updatePost,
  getPosts,
  getPost,
  acceptPost,
  getPostByStatus
 
};