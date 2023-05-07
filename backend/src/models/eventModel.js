const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
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
    type: Date,
    required: true,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Event", eventSchema);
