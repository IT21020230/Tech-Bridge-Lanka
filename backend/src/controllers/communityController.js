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
    status: "Pending",
    createdBy: req.body.createdBy,
  });

  await community.save();
  res.send(community);
};

const getAllCommunity = async (req, res) => {
  const community = await Community.find({ status: "Accepted" });
  res.send(community);
};

const getCommunity = async (req, res) => {
  const Arr = [];
  const community = await Community.findById(req.params.id);
  Arr.push(community);
  res.send(Arr);
};

const updateCommunity = async (req, res) => {
  const community = await Community.findById(req.params.id);

  if (community) {
    community.vission = req.body.vission;
    community.Mission = req.body.Mission;
    community.faceBookLink = req.body.faceBookLink;
    community.instergrameLink = req.body.instergrameLink;
    community.whatsappLink = req.body.whatsappLink;
    community.email = req.body.email;
    community.contactNumber = req.body.contactNumber;
    community.coverPic = req.body.coverPic;
    community.logo = req.body.logo;
    community.size = req.body.size;

    const updateComm = await community.save();

    res.json(updateComm);
  } else {
    res.status(404);
    throw new Error("community not found");
  }
};

//get single community

const getCommunityByCommunityId = async (req, res) => {
  const community = await Community.find({ _id: req.params.id });

  res.status(200).json(community);
};

//accept community

const acceptCommunity = async (req, res) => {
  const community = await Community.findById(req.params.id);

  if (community) {
    community.status = "Accepted";

    const acceptedCommunity = await community.save();

    res.json(acceptedCommunity);
  } else {
    res.status(404);

    throw new Error("Order not found");
  }
};

const getCommunityByStatus = async (req, res) => {
  const community = await Community.find({ status: req.params.status });
  res.status(200).json(community);
};

module.exports = {
  createCommunity,
  getAllCommunity,
  updateCommunity,
  getCommunity,
  acceptCommunity,
  getCommunityByCommunityId,
  getCommunityByStatus,
};
