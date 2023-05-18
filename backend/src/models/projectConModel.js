const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectConSchema = new Schema({
  commID: {
    type: String,
    required: false,
  },
  projectId: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: false,
  },
  personId: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("projectContributions", projectConSchema);
