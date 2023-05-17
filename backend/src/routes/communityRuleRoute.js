const express = require("express");
const {
  createCommunityRule,
  deleteRuleSet,
  getAllRules,
  deleteRule,
  updateRule,
} = require("../controllers/communityRuleController");

const router = express.Router();

//Post a new order
router.post("/createRule", createCommunityRule);
router.get("/getAllRules/:id", getAllRules);
router.delete("/deleteRuleSet/:commID", deleteRuleSet);
router.delete("/deleteRule/:id", deleteRule);
router.patch("/updateRule/:id", updateRule);

module.exports = router;
