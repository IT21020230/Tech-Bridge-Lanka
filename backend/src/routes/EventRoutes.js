const express = require("express");

const {
  createEvents,
  updateEvents,
  getAllEvents,
  getEventById,
  getEventByCommId,
  deleteEvents,
  getEventByStatus,
  acceptEvent,
} = require("../controllers/eventController");

const router = express.Router();

//Create a event
router.post("/", createEvents);

//Update a event
router.patch("/:id", updateEvents);

//GET all event
router.get("/", getAllEvents);

//Get a event by its ID
router.get("/:id", getEventById);

//Get a event by its ID
router.get("/commID/:commID", getEventByCommId);

//Delete a event
router.delete("/:id", deleteEvents);

//Accept an event
router.patch("/accept/:id", acceptEvent);

//get event by status
router.get("/get-event-by-status/:status", getEventByStatus);

module.exports = router;
