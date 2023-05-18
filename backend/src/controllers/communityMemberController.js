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

module.exports = {
  createCommunityMember,
};
