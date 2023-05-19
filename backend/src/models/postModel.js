const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    community: String,
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;

// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;

// const PostSchema = new Schema(
//   {
//     title: String,
//     summary: String,
//     content: String,
//     cover: String,
//     author: String,
//     community: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const PostModel = model("Post", PostSchema);

// module.exports = PostModel;
