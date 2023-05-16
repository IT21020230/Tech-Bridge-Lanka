const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commuinityRuleSchema = new Schema({
  commID: {
    type: String,
    required: true,
  },
  rule: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CommunityRule", commuinityRuleSchema);
