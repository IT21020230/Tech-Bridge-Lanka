const express = require("express");
const {
    createIssue,
    getIssueByStatus,
    getIssueById,
    acceptIssue
  
} = require("../controllers/issueController");

const router = express.Router();

//Post a new issue
router.post("/", createIssue);

//Get issue by issue status
router.get("/get-issue-by-issue-status/:status", getIssueByStatus)

//Get all pending issues
//router.get("/get-all-pending-issues/:status", getAllPendingIssues)

//Get issue by id
router.get("/get-issue-by-id/:id", getIssueById)

//accept issue
router.patch("/accept-issue/:id", acceptIssue)

module.exports = router;