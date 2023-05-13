const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  loginUser,
  signupUser,
  addUserLocation,
  getLocations,
} = require("../controllers/userController");

//GET all users
router.get("/", getAllUsers);

// POST request to store user's home location in the database
router.patch("/home-location", addUserLocation);

//Login route
router.post("/login", loginUser);

//Signup route
router.post("/signup", signupUser);

// get all user locations
router.get("/locations", getLocations);

module.exports = router;
