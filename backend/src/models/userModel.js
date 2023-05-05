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
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  homeLocation: {
    type: { type: String },
    coordinates: [Number],
  },
});

userSchema.index({ homeLocation: "2dsphere" });

// export user model
module.exports = mongoose.model("User", userSchema);
