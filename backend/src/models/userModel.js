const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
  },
  age: {
    type: Number,
  },
  province: {
    type: String,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
