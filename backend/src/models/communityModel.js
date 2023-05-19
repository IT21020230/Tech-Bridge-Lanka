const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commuinitySchema = new Schema({
  commName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  startedDate: {
    type: String,
  },
  size: {
    type: String,
    required: true,
  },
  registrationFile: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  coverPic: {
    type: String,
    required: true,
  },
  status: {
    type: String
  }
});

module.exports = mongoose.model("Community", commuinitySchema);