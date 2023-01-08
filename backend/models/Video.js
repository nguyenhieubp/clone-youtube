const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaVideo = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    view: {
      type: Number,
      default: 0,
    },
    like: {
      type: [String],
      default: [],
    },
    disLike: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", schemaVideo);
