const express = require("express");
const {
  createCommunity,
  getAllCommunity,
  updateCommunity,
  getCommunity,
  acceptCommunity,
  getCommunityByCommunityId,
  getCommunityByStatus,


} = require("../controllers/communityController");

const router = express.Router();

//Post a new order
router.post("/createCommunity", createCommunity);
router.get("/getAllCommunity", getAllCommunity);
router.get("/getCommunity/:id", getCommunity);
router.patch("/updateCommunity/:id", updateCommunity);
router.patch("/accept-community/:id", acceptCommunity);
router.get("/get-single-comuunity/:id", getCommunityByCommunityId);
router.get("/get-community-by-status/:status", getCommunityByStatus);


module.exports = router;
