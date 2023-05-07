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
<<<<<<< HEAD
  homeLocation: {
    type: { type: String },
    coordinates: [Number],
=======
  photo: {
    type: String,
>>>>>>> e37b4da04d3059a70b898bb11159d4abe52e170a
  },
});

userSchema.index({ homeLocation: "2dsphere" });

// export user model
module.exports = mongoose.model("User", userSchema);
