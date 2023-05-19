const mongoose = require("mongoose");
const { array } = require("yargs");

const Schema = mongoose.Schema;

const commuinityAnswer = new Schema({
  commID: {
    type: String,
    required: true,
  },
  answer: {
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  proPic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("commuinityAnswer", commuinityAnswer);
