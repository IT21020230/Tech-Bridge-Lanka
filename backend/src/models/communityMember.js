const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const communityMemeber = new Schema({
  userID: {
    type: String,
    required: true,
  },
  memberName: {
    type: String,
    required: true,
  },
  proPic: {
    type: String,
    required: true,
  },
  commID: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CommunityMember", communityMemeber);
