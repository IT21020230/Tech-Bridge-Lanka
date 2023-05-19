const CommunityQuestion = require("../models/communityQuestionModel");
const mongoose = require("mongoose");

//Create a community rules
const createCommunityQuestion = async (req, res) => {
  const communityQuestion = new CommunityQuestion({
    commID: req.body.commID,
    question: req.body.question,
  });

  await communityQuestion.save();
  res.send(communityQuestion);
};

//get community Rules
const getAllQuestion = async (req, res) => {
  const communityQuestion = await CommunityQuestion.find({
    commID: req.params.id,
  });
  res.send(communityQuestion);
};

//get single qusetion

const getSingleQuestion = async (req, res) => {
  const arr = [];
  const communityQuestion = await CommunityQuestion.findById(req.params.id);
  arr.push(communityQuestion);
  res.send(arr);
};

// delete a question
const deleteQuestion = async (req, res) => {
  const communityQuestion = await CommunityQuestion.findByIdAndDelete(
    req.params.id
  );
  res.send(communityQuestion);
};

const updateQuestion = async (req, res) => {
  const communityQuestion = await CommunityQuestion.findById(req.params.id);

  if (communityQuestion) {
    communityQuestion.question = req.body.question;

    const communityQuestionUp = await communityQuestion.save();

    res.json(communityQuestionUp);
  } else {
    res.status(404);
    throw new Error("community rule not found");
  }
};

module.exports = {
  createCommunityQuestion,

  getAllQuestion,
  deleteQuestion,
  updateQuestion,
  getSingleQuestion,
};
