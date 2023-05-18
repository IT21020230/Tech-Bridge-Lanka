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
<<<<<<< HEAD
<<<<<<< HEAD
  homeLocation: {
    type: { type: String },
    coordinates: [Number],
=======
  photo: {
    type: String,
>>>>>>> e37b4da04d3059a70b898bb11159d4abe52e170a
=======
  homeLocation: {
    type: { type: String },
    coordinates: [Number],
>>>>>>> 1bb55f56f4ea85999c084921c1f22b4ee1e39069
  },
});

userSchema.index({ homeLocation: "2dsphere" });

// export user model
module.exports = mongoose.model("User", userSchema);
