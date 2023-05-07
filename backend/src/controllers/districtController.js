const Districts = require("../models/districtModel");

const getDistrictsData = async (req, res) => {
  const districtsData = await Districts.find({});
  res.status(200).json(districtsData);
};

module.exports = {
  getDistrictsData,
};
