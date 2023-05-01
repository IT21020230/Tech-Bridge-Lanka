// get all users
const User = require("../models/userModel");

//return all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};
// store user's home location in the database
const addUserLocation = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.homeLocation = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };

    await user.save();

    return res.send({ message: "Home location saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  addUserLocation,
};
