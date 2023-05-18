const express = require("express");

const {
    getDistrictsData,
} = require("../controllers/districtController");

const router = express.Router();

// GET all district data
router.get("/districts-data", getDistrictsData);

module.exports = router;
