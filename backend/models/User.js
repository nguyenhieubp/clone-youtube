const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaUser = new Schema(
  {
    avatar: {
      type: String,
      required: [true, "You can Avatar"],
    },
    name: {
      type: String,
      required: [true, "You can Name"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "You can Email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "You can Password"],
      trim: true,
      minlength: 8,
    },
    subscribeUser: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", schemaUser);
