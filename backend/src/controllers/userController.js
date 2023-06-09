const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const District = require("../models/districtModel");

// Create JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check both fields are filled
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password fields must be filled" });
    }

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email does not exists" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = createToken(user._id);

    // const token = jwt.sign(
    //   { userId: user.id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    res.json({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// signup user
const signupUser = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      name,
      phone,
      age,
      province,
      city,
      photo,
      role,
    } = req.body;

    // Check name or email, name or password is empty
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "email, password, name fields must be filled" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    // Check password and confirm password are equal or not
    if (!(password === confirmPassword)) {
      return res.status(400).json({
        error: "Password and confirm password mismatch",
      });
    }

    // Check if password is strong enough
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password is not strong enough.\nMust contain an uppercase, a lowercase, a special character, a number and must be more than eight characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hash,
      name,
      phone,
      age,
      province,
      city,
      photo,
      role,
    });
    await user.save();

    // Increment the count by one in the district model
    await District.findOneAndUpdate({ district: city }, { $inc: { count: 1 } });

    const token = createToken(user._id);

    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// signup user
const createUser = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      name,
      phone,
      age,
      province,
      city,
      photo,
      role,
    } = req.body;

    // Check name or email, name or password is empty
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "email, password, name fields must be filled" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    // Check password and confirm password are equal or not
    if (!(password === confirmPassword)) {
      return res.status(400).json({
        error: "Password and confirm password mismatch",
      });
    }

    // Check if password is strong enough
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password is not strong enough.\nMust contain an uppercase, a lowercase, a special character, a number and must be more than eight characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hash,
      name,
      phone,
      age,
      province,
      city,
      photo,
      role,
    });
    await user.save();

    // const token = createToken(user._id);

    // res.status(200).json({
    //   userId: user._id,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    //   token: token,
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update the User
const updateUser = async (req, res) => {
  try {
    const { email, password, name, phone, age, province, city, photo, role } =
      req.body;

    // Find User by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Update User
    user.email = email || user.email;
    user.password = hash || user.password;
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.age = age || user.age;
    user.province = province || user.province;
    user.city = city || user.city;
    user.photo = photo || user.photo;
    user.role = role || user.role;

    await user.save();

    //send success message
    res.json({ message: "User updated successfully" });

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all User
const getAllUser = async (req, res) => {
  try {
    // Find User
    const user = await User.find();

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
      console.log("***All Users got successfully***");
    }

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a user by its ID
const getUserById = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Get user
    console.error("***User got successfully***");
    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete the user
const deleteUser = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.deleteOne();

    //send success message
    res.json({ message: "User deleted successfully" });

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
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

// endpoint to get all user locations
const getLocations = async (req, res) => {
  try {
    const users = await User.find({ homeLocation: { $ne: null } }); // find all users with a non-null homeLocation field
    const locations = users.map((user) => user.homeLocation.coordinates); // extract the coordinates from each user's homeLocation field
    res.json(locations); // send the list of coordinates as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  loginUser,
  signupUser,
  getLocations,
  addUserLocation,
  updateUser,
  getAllUser,
  getUserById,
  deleteUser,
  createUser,
};
