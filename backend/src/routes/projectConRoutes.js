const express = require("express");

const {
  createProjectsCon,
  // updateProjects,
  // getAllProjects,
  getProjectConByProId,
  // deleteProjects,
} = require("../controllers/projectConController");

const router = express.Router();

//Create a project contributor
router.post("/", createProjectsCon);

// //Update a project
// router.patch("/:id", updateProjects);

// //GET all projects
// router.get("/", getAllProjects);

//Get a project Contributions by project ID
router.get("/:projectId", getProjectConByProId);

// //Delete a project
// router.delete("/:id", deleteProjects);

module.exports = router;
