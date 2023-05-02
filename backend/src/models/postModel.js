const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  intro: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String, required: true },
  publishedCommunity: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

// Add toJSON method to remove underscore from id field
postSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Post", postSchema);
