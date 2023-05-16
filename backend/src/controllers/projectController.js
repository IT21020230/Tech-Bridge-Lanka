const Project = require("../models/projectModel");

//Create Projects
const createProjects = async (req, res) => {
  try {
    const { name, commID, commName, description, image, startDate, endDate } =
      req.body;

    // Check name, commID, commName, startDate, endDate is empty
    if (!name || !commID || !commName || !startDate || !endDate) {
      return res.status(400).json({
        message:
          "name, commID, commName, startDate, endDate, fields must be filled",
      });
    }

    // Check if Project already exists
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return res.status(409).json({ message: "Project already exists" });
    }

    // Create new Project
    const project = new Project({
      name,
      commID,
      commName,
      description,
      image,
      startDate,
      endDate,
    });
    await project.save();

    res
      .status(200)
      .json({ name, commID, commName, description, image, startDate, endDate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update a Project
const updateProjects = async (req, res) => {
  try {
    const { name, commID, commName, description, image, startDate, endDate } =
      req.body;

    // Find Project by ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update Project
    project.name = name || project.name;
    project.commID = commID || project.commID;
    project.commName = commName || project.commName;
    project.description = description || project.description;
    project.image = image || project.image;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;

    await project.save();

    //send success message
    res.json({ message: "Project updated successfully" });

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all Projects
const getAllProjects = async (req, res) => {
  try {
    // Find Projects
    const project = await Project.find();

    if (!project) {
      res.status(404).send("projects not found");
    } else {
      res.send(project);
      console.log("***All projects got successfully***");
    }

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get a project by its ID
const getProjectById = async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    //Get project
    console.error("***Project got successfully***");
    return res.status(200).send(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get a project by community ID
const getProjectByCommId = async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.find({
      commID: req.params.commID,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    //Get project
    console.error("***Project got successfully***");
    return res.status(200).send(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a project
const deleteProjects = async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete project
    await project.deleteOne();

    //send success message
    res.json({ message: "Project deleted successfully" });

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProjects,
  updateProjects,
  getAllProjects,
  getProjectById,
  getProjectByCommId,
  deleteProjects,
};
