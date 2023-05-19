const express = require("express");

const router = express.Router();

const {
  getAllUser,
  loginUser,
  signupUser,
  updateUser,
  getUserById,
  deleteUser,
  addUserLocation,
  getLocations,
  createUser,
} = require("../controllers/userController");

// get all user locations
router.get("/locations", getLocations);

// POST request to store user's home location in the database
router.patch("/home-location", addUserLocation);

//GET all users
router.get("/", getAllUser);

//Login route
router.post("/login", loginUser);

//Signup route
router.post("/signup", signupUser);

//Update user route
router.patch("/:id", updateUser);

//Get user by id route
router.get("/:id", getUserById);

//Delete user route
router.delete("/:id", deleteUser);

// get all user locations
router.get("/locations", getLocations);

// POST request to store user's home location in the database
router.patch("/home-location", addUserLocation);

// POST request to create a new user
router.post("/", createUser);

module.exports = router;
