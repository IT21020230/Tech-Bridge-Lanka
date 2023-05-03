const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  loginUser,
  signupUser,
} = require("../controllers/userController");

//GET all users
router.get("/", getAllUsers);

//Login route
router.post("/login", loginUser);

//Signup route
router.post("/signup", signupUser);

module.exports = router;
