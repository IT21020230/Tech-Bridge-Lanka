const express = require("express");
const { createCommunity } = require("../controllers/communityController");

const router = express.Router();

//Post a new order
router.post("/createCommunity", createCommunity);

module.exports = router;
