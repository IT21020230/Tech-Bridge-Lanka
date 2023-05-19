const CommunityAnswer = require("../models/communityAnswer");
const mongoose = require("mongoose");

//Create a community rules
const createCommunityAnswer = async (req, res) => {
  const communityanswer = new CommunityAnswer({
    commID: req.body.commID,
    answer: req.body.answer,
    userId: req.body.userId,
    userName: req.body.userName,
    proPic: req.body.proPic,
  });

  await communityanswer.save();
  res.send(communityanswer);
};

//get request

const getRequest = async (req, res) => {
  const communityAnswers = await CommunityAnswer.find({
    commID: req.params.id,
  });

  res.send(communityAnswers);
};

const getOneRequest = async (req, res) => {
  const arr = [];
  const communityAnswers = await CommunityAnswer.findById(req.params.id);
  arr.push(communityAnswers);
  res.send(arr);
};

const deleteRequest = async (req, res) => {
  const request = await CommunityAnswer.findByIdAndDelete(req.params.id);
  res.send(request);
};

const getOneMember = async (req, res) => {
  const member = await CommunityAnswer.find({
    userId: req.params.uID,
    commID: req.params.cID,
  });
  res.send(member);
};

module.exports = {
  createCommunityAnswer,
  getRequest,
  getOneRequest,
  deleteRequest,
  getOneMember,
};
