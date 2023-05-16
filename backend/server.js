require("dotenv").config();

const port = process.env.PORT;
const express = require("express");
const multer = require("multer");
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
app.use("/uploads", express.static(__dirname + "/uploads"));

// set up routes
const userRoutes = require("./src/routes/userRoutes");
const postRoutes = require("./src/routes/postRoutes");
const districtRoutes = require("./src/routes/districtRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const community = require("./src/routes/communityRoutes");
const communityRule = require("./src/routes/communityRuleRoute");

//file upload
//logo uploading
const logoUploading = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "../frontend/src/TBL/components/Community/createCommunity/communityLogo"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadLogo = multer({ storage: logoUploading });

app.post("/logo", multer(uploadLogo).single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});

//cover uploading
const coverUploading = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "../frontend/src/TBL/components/Community/createCommunity/communityCover"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCover = multer({ storage: coverUploading });

app.post("/cover", multer(uploadCover).single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});
//register file uploading
const registerFileUploading = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "../frontend/src/TBL/components/Community/createCommunity/registerDocuments"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadRegisterFile = multer({ storage: registerFileUploading });

app.post("/pdf", multer(uploadRegisterFile).single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});
// define routes
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/ddd-data", districtRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/community", community);
app.use("/api/communityRule", communityRule);

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
const postRoutes = require("./src/routes/postRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const projectConRoutes = require("./src/routes/projectConRoutes");

// define routes
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/projectCon", projectConRoutes);

