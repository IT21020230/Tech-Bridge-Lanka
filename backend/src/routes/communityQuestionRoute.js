const express = require("express");
const {
  createCommunityQuestion,

  getAllQuestion,
  deleteQuestion,
  updateQuestion,
  getSingleQuestion,
} = require("../controllers/communityQuestionController");

const router = express.Router();

//Post a new order
router.post("/createQuestion", createCommunityQuestion);
router.get("/getAllQuestion/:id", getAllQuestion);
router.get("/getSingleQuestion/:id", getSingleQuestion);
router.delete("/deleteQuestion/:id", deleteQuestion);
router.patch("/updateQuestion/:id", updateQuestion);

module.exports = router;
