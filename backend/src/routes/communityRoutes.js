const express = require("express");
const { createCommunity,
        getCommunityByStatus ,
        getCommunityByCommunityId,
        acceptCommunity
    } = require("../controllers/communityController");

const router = express.Router();

//Post a new order
router.post("/createCommunity", createCommunity);

//get community by status
router.get("/get-community-by-status/:status", getCommunityByStatus)

//get single community
router.get("/get-single-comuunity/:pagaya", getCommunityByCommunityId)

//accept communinty
router.patch("/accept-community/:id", acceptCommunity)

module.exports = router;