const express = require("express");
const {
  createCommunityMember,
  getMembers,
  changeRoll,
  removeMember,
  getOneMember,
} = require("../controllers/communityMemberController");

const router = express.Router();

//Post a new order
router.post("/createCommunityMember", createCommunityMember);
router.get("/getMembers/:id", getMembers);
router.patch("/changeRoll/:id", changeRoll);
router.delete("/removeMember/:id", removeMember);
router.get("/getOneMember/:uID/:cID", getOneMember);

module.exports = router;
