const Community = require("../models/communityModel");
const mongoose = require("mongoose");

//Create a community
const createCommunity = async (req, res) => {
  const community = new Community({
    commName: req.body.commName,
    location: req.body.location,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    startedDate: req.body.startedDate,
    size: req.body.size,
    registrationFile: req.body.registrationFile,
    logo: req.body.logo,
    coverPic: req.body.coverPic,
  });

  await community.save();
  res.send(community);
};

module.exports = {
  createCommunity,
};
