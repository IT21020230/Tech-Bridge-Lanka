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

<<<<<<< HEAD
userSchema.index({ homeLocation: "2dsphere" });

// export user model
module.exports = mongoose.model("User", userSchema);
=======
UserSchema.index({ homeLocation: "2dsphere" });

module.exports = mongoose.model("User", userSchema);

>>>>>>> 7b0151d34e4400c34030d285df1000564c7049e3
