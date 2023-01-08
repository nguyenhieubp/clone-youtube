const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaComment = new Schema({
  video: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Video",
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: [true, "you can have comment"],
  },
});

module.exports = mongoose.model("Comment", schemaComment);
