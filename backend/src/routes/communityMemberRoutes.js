const express = require("express");
const {
  createCommunityMember,
} = require("../controllers/communityMemberController");

const router = express.Router();

//Post a new order
router.post("/createCommunityMember", createCommunityMember);

module.exports = router;
