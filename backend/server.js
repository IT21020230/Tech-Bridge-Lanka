require("dotenv").config();

const port = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

// Connect to the database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(port, () => {
      console.log(
        `Connected to the Database and Listening on http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

// set up routes
const userRoutes = require("./src/routes/userRoutes");

// define routes
app.use("/api/user", userRoutes);
