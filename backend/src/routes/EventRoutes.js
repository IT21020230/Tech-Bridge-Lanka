const express = require("express");

const {
  createEvents,
  updateEvents,
  getAllEvents,
  getEventById,
  getEventByCommId,
  deleteEvents,
} = require("../controllers/eventController");

const router = express.Router();

//Create a project
router.post("/", createEvents);

//Update a project
router.patch("/:id", updateEvents);

//GET all projects
router.get("/", getAllEvents);

//Get a project by its ID
router.get("/:id", getEventById);

//Get a project by its ID
router.get("/commID/:commID", getEventByCommId);

//Delete a project
router.delete("/:id", deleteEvents);

module.exports = router;
