const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  loginUser,
  signupUser,
} = require("../controllers/userController");

//GET all users
router.get("/", getAllUsers);

// POST request to store user's home location in the database
router.post("/home-location", addUserLocation);

//Login route
router.post("/login", loginUser);

//Signup route
router.post("/signup", signupUser);

module.exports = router;
