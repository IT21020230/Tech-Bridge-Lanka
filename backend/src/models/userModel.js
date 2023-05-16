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
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  homeLocation: {
    type: { type: String },
    coordinates: [Number],
  },
});

userSchema.index({ homeLocation: "2dsphere" });

// export user model
module.exports = mongoose.model("User", userSchema);
