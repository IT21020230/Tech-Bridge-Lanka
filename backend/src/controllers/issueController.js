const Issue = require('../models/issueMOdel.js');
const mongoose = require("mongoose");


const createIssue = async (req, res) => {
    const issue = new Issue({
      title: req.body.title,
      description: req.body.description,
      proof: req.body.proof,
      province: req.body.province,
      district: req.body.district,
      status: "Pending"
      
    });
  
    await issue.save();
     
    res.send(issue);
    
  };   
  
  const getIssueByStatus = async (req, res) => {
    const issue = await Issue.find({ status: req.params.status });
    res.status(200).json(issue);
  };

  //Get all pending issues
  const getAllPendingIssues = async (req, res) => {
    const issues = await Issue.find({status: req.params.status});
    res.status(200).json(issues);
  }

  // get issue by id
  const getIssueById = async(req, res) => {
    const issue = await Issue.find({ _id: req.params.id })
    res.status(200).json(issue);
  }

  //Accept issue
  const acceptIssue = async(req, res) => {
    const issue = await Issue.findById({ _id: req.params.id});

    issue.status = "Accepted";

    const acceptedIssue = await issue.save();
    res.json(acceptedIssue);
  }



  module.exports = {
    createIssue,
    getIssueByStatus,
    getAllPendingIssues,
    getIssueById,
    acceptIssue
    
  };