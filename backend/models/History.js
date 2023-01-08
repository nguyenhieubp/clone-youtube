const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaHistory = new Schema({
  user: String,
  video: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("History", SchemaHistory);
