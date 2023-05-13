const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  loginUser,
  signupUser,
<<<<<<< HEAD
  addUserLocation,
  getLocations,
=======
  getAllUsers,
  addUserLocation,
>>>>>>> 7b0151d34e4400c34030d285df1000564c7049e3
} = require("../controllers/userController");

//GET all users
router.get("/", getAllUsers);

<<<<<<< HEAD
// POST request to store user's home location in the database
router.patch("/home-location", addUserLocation);
=======

// POST request to store user's home location in the database
router.post("/home-location", addUserLocation);
>>>>>>> 7b0151d34e4400c34030d285df1000564c7049e3

//Login route
router.post("/login", loginUser);

//Signup route
router.post("/signup", signupUser);

<<<<<<< HEAD
// get all user locations
router.get("/locations", getLocations);
=======
>>>>>>> 7b0151d34e4400c34030d285df1000564c7049e3

module.exports = router;
