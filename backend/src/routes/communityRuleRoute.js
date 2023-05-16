const express = require("express");
const {
  createCommunityRule,
  deleteRuleSet,
} = require("../controllers/communityRuleController");

const router = express.Router();

//Post a new order
router.post("/createRule", createCommunityRule);
router.delete("/deleteRuleSet/:commID", deleteRuleSet);

module.exports = router;
