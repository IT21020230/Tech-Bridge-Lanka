const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: null,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  homeLocation: {
    type: { type: String },
    coordinates: [Number],
  },
});

userSchema.index({ homeLocation: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
