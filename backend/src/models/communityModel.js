const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commuinitySchema = new Schema({
  commName: {
    type: String,
  },
  location: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  startedDate: {
    type: String,
  },
  size: {
    type: String,
  },
  registrationFile: {
    type: String,
  },
  logo: {
    type: String,
  },
  coverPic: {
    type: String,
  },
  vission: {
    type: String,
  },

  Mission: {
    type: String,
  },
  faceBookLink: {
    type: String,
  },
  instergrameLink: {
    type: String,
  },
  whatsappLink: {
    type: String,
  },

  status: {
    type: String,
  },
  createdBy: {
    type: String,
  },
});

module.exports = mongoose.model("Community", commuinitySchema);
