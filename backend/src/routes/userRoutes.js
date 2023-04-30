const express = require("express");

const {
  getAllUsers,
  addUserLocation,
} = require("../controllers/userController");

const router = express.Router();

//GET all users
router.get("/", getAllUsers);

// POST request to store user's home location in the database
router.post("/home-location", addUserLocation);

module.exports = router;
