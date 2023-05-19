const express = require("express");
const {
  createCommunityAnswer,
  getRequest,
  getOneRequest,
  deleteRequest,
  getOneMember,
} = require("../controllers/communityAnswerController");

const router = express.Router();

//Post a new order
router.post("/createCommunityAnswer", createCommunityAnswer);
router.get("/getRequest/:id", getRequest);
router.get("/getOneRequest/:id", getOneRequest);
router.get("/getOneMember/:uID/:cID", getOneMember);
router.delete("/deleteRequest/:id", deleteRequest);
module.exports = router;
