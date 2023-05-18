const CommunityRule = require("../models/communityRuleModel");
const mongoose = require("mongoose");

//Create a community rules
const createCommunityRule = async (req, res) => {
  const communityRule = new CommunityRule({
    commID: req.body.commID,
    rule: req.body.rule,
  });

  await communityRule.save();
  res.send(communityRule);
};

//delete set of rules

const deleteRuleSet = async (req, res) => {
  try {
    const rule = await CommunityRule.find({ commID: req.params.commID });
    if (!rule) {
      return res.status(404).json({ message: "rules not found" });
    }

    // Delete product
    rule.map(async (data) => {
      await CommunityRule.findByIdAndDelete(data._id);
    });

    //send success message
    res.json({ message: "Rules deleted successfully" });

    //If there's an error, throw error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCommunityRule,
  deleteRuleSet,
};
