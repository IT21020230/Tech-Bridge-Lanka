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
    status: "Pending"
  });

  await community.save();
  res.send(community);
};

//Get community by status
const getCommunityByStatus = async (req, res) => {
    const community = await Community.find({ status: req.params.status });
    res.status(200).json(community);
    };


//get single community
const getCommunityByCommunityId = async (req, res) => {
  const community = await Community.find({ _id: req.params.pagaya });
  res.status(200).json(community);
};


//accept community
const acceptCommunity = async (req, res) => {
  const community = await Community.findById(req.params.id);
  //var email = req.params.email;
  //sendEmail("sahanpradeeptha@gmail.com", 'Your order has been updated', `Dear valued customer, Your order has been successfully delivered to you.`)

  if (community) {
    
    community.status = "Accepted";

    const acceptedCommunity = await community.save();

    res.json(acceptedCommunity);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};



module.exports = {
  createCommunity,
  getCommunityByStatus,
  getCommunityByCommunityId,
  acceptCommunity
};