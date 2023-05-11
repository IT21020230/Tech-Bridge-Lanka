const express = require("express");

const {
  createProjects,
  updateProjects,
  getAllProjects,
  getProjectById,
  deleteProjects,
} = require("../controllers/projectController");

const router = express.Router();

//Create a project
router.post("/", createProjects);

//Update a project
router.patch("/:id", updateProjects);

//GET all projects
router.get("/", getAllProjects);

//Get a project by its ID
router.get("/:id", getProjectById);

//Delete a project
router.delete("/:id", deleteProjects);

module.exports = router;
