const ProjectCon = require("../models/projectConModel");

//Create Projects Contributions
const createProjectsCon = async (req, res) => {
  try {
    const { commID, projectId, projectName, personId, personName } = req.body;

    // Check name, commID, commName, startDate, endDate is empty
    if (!projectId || !personId || !personName) {
      return res.status(400).json({
        message: "projectId, personId, personName fields must be filled",
      });
    }

    // Check if Project already exists
    const existingProject = await ProjectCon.findOne({ projectId });
    if (existingProject) {
      return res.status(409).json({ message: "Project already exists" });
    }

    // Create new Project
    const projectCon = new ProjectCon({
      commID,
      projectId,
      projectName,
      personId,
      personName,
    });
    await projectCon.save();

    res
      .status(200)
      .json({ commID, projectId, projectName, personId, personName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// //Update a Project
// const updateProjects = async (req, res) => {
//   try {
//     const { name, commID, commName, description, image, startDate, endDate } =
//       req.body;

//     // Find Project by ID
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     // Update Project
//     project.name = name || project.name;
//     project.commID = commID || project.commID;
//     project.commName = commName || project.commName;
//     project.description = description || project.description;
//     project.image = image || project.image;
//     project.startDate = startDate || project.startDate;
//     project.endDate = endDate || project.endDate;

//     await project.save();

//     //send success message
//     res.json({ message: "Project updated successfully" });

//     //If there's an error, throw error
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //Get all Projects
// const getAllProjects = async (req, res) => {
//   try {
//     // Find Projects
//     const project = await Project.find();

//     if (!project) {
//       res.status(404).send("projects not found");
//     } else {
//       res.send(project);
//       console.log("***All projects got successfully***");
//     }

//     //If there's an error, throw error
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //Get a project Contributions by project ID
const getProjectConByProId = async (req, res) => {
  try {
    // Find project by ID
    const projectCon = await ProjectCon.find({
      projectId: req.params.projectId,
    });
    if (!projectCon) {
      return res.status(404).json({ message: "Project not found" });
    }

    //Get project
    console.error("***Project got successfully***");
    return res.status(200).send(projectCon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// //Delete a project
// const deleteProjects = async (req, res) => {
//   try {
//     // Find project by ID
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     // Delete project
//     await project.deleteOne();

//     //send success message
//     res.json({ message: "Project deleted successfully" });

//     //If there's an error, throw error
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  createProjectsCon,
  // updateProjects,
  // getAllProjects,
  getProjectConByProId,
  // deleteProjects,
};
