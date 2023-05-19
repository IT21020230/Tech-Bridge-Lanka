const Event = require("../models/eventModel");

//Create Events
const createEvents = async (req, res) => {
  try {
    const { name, commID, commName, description, image, location, date } =
      req.body;

    // Check name, commID, commName, startDate, endDate is empty
    if (!name || !commID || !commName || !location || !date) {
      return res.status(400).json({
        message: "name, commID, commName, location, date fields must be filled",
      });
    }

    // Check if Event already exists
    const existingEvents = await Event.findOne({ name });
    if (existingEvents) {
      return res.status(409).json({ message: "Event already exists" });
    }

    //var formattedDate = date.toISOString().split("T")[0];

    // Create new Event
    const event = new Event({
      name,
      commID,
      commName,
      description,
      image,
      location,
      date,
    });
    await event.save();

    res
      .status(200)
      .json({ name, commID, commName, description, image, location, date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update a Event
const updateEvents = async (req, res) => {
  try {
    const { name, commID, commName, description, image, location, date } =
      req.body;

    // Find Event by ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update Event
    event.name = name || event.name;
    event.commID = commID || event.commID;
    event.commName = commName || event.commName;
    event.description = description || event.description;
    event.image = image || event.image;
    event.location = location || event.location;
    event.date = date || event.date;

    await event.save();

    //send success message
    res.json({ message: "Event updated successfully" });

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all Events
const getAllEvents = async (req, res) => {
  try {
    // Find Events
    const event = await Event.find();

    if (!event) {
      res.status(404).send("events not found");
    } else {
      res.send(event);
      console.log("***All events got successfully***");
    }

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get a event by its ID
const getEventById = async (req, res) => {
  try {
    // Find event by ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    //Get event
    console.error("***Event got successfully***");
    return res.status(200).send(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get a event by comm ID
const getEventByCommId = async (req, res) => {
  try {
    // Find event by ID
    const event = await Event.find({
      commID: req.params.commID,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    //Get event
    console.error("***Event got successfully***");
    return res.status(200).send(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a event
const deleteEvents = async (req, res) => {
  try {
    // Find event by ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete event
    await event.deleteOne();

    //send success message
    res.json({ message: "Event deleted successfully" });

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createEvents,
  updateEvents,
  getAllEvents,
  getEventById,
  getEventByCommId,
  deleteEvents,
};
