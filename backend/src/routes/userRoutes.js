const express = require("express");

const router = express.Router();

const {
  getAllUser,
  loginUser,
  signupUser,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

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

module.exports = router;
