const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  commID: {
    type: String,
    required: true,
  },
  commName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
