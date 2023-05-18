const CommunityRule = require("../models/communityRuleModel");
const mongoose = require("mongoose");

//Create a community rules
const createCommunityRule = async (req, res) => {
  const communityrule = new CommunityRule({
    commID: req.body.commID,
    rule: req.body.rule,
  });

  await communityrule.save();
  res.send(communityrule);
};

//get community Rules
const getAllRules = async (req, res) => {
  const communityrule = await CommunityRule.find({
    commID: req.params.id,
  });
  res.send(communityrule);
};

//get single rule

const getSingleRules = async (req, res) => {
  const arr = [];
  const communityrule = await CommunityRule.findById(req.params.id);
  arr.push(communityrule);
  res.send(arr);
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

const deleteRule = async (req, res) => {
  const communityrule = await CommunityRule.findByIdAndDelete(req.params.id);
  res.send(communityrule);
};

const updateRule = async (req, res) => {
  const communityRule = await CommunityRule.findById(req.params.id);

  if (communityRule) {
    communityRule.rule = req.body.rule;

    const communityRuleUp = await communityRule.save();

    res.json(communityRuleUp);
  } else {
    res.status(404);
    throw new Error("community rule not found");
  }
};

module.exports = {
  createCommunityRule,
  deleteRuleSet,
  getAllRules,
  deleteRule,
  updateRule,
  getSingleRules,
};
