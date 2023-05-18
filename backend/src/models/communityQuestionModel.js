const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commuinityQuestionSchema = new Schema({
  commID: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CommunityQuestion", commuinityQuestionSchema);
