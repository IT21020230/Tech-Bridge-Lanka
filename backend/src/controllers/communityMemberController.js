const CommunityMember = require("../models/communityMember");
const mongoose = require("mongoose");

//Create a community
const createCommunityMember = async (req, res) => {
  const CommunityMem = new CommunityMember({
    userID: req.body.userID,
    memberName: req.body.name,
    proPic: req.body.pic,
    commID: req.body.comId,
    role: req.body.role,
  });

  await CommunityMem.save();
  res.send(CommunityMem);
};

const getMembers = async (req, res) => {
  const members = await CommunityMember.find({ commID: req.params.id });
  res.send(members);
};

const getOneMember = async (req, res) => {
  const member = await CommunityMember.find({
    userID: req.params.uID,
    commID: req.params.cID,
  });
  res.send(member);
};

const removeMember = async (req, res) => {
  const member = await CommunityMember.findByIdAndDelete(req.params.id);
  res.send(member);
};

const changeRoll = async (req, res) => {
  const member = await CommunityMember.findById(req.params.id);

  if (member) {
    member.role = req.body.role;

    const updateMember = await member.save();
    res.json(updateMember);
  } else {
    res.status(404);
    throw new Error("Member not found");
  }
};

module.exports = {
  createCommunityMember,
  getMembers,
  changeRoll,
  removeMember,
  getOneMember,
};
