const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubSChema = new Schema({
  user: String,
  userSub: String,
});

module.exports = mongoose.model("Sub", SubSChema);
