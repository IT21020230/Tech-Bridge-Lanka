const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  proof: {
    type: String,
    required: true,
  },

  province: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Issues", issueSchema);
