const Comment = require("../models/Comment");
const Video = require("../models/Video");

module.exports.createComment = async (req, res) => {
  const { video } = req.params;
  const newComment = new Comment({ ...req.body, user: req.user, video });
  try {
    await newComment.save();
    res.json({ message: "SUCCESS", comment: newComment });
  } catch (error) {
    res.json({ message: "FAIL", error });
  }
};

module.exports.getComment = async (req, res, next) => {
  const { video } = req.params;
  try {
    const comments = await Comment.find({ video: video }).populate(
      "user",
      "-password -email -listVideo -subscribe -subscribeUser"
    );
    res.json({ message: "SUCCESS", length: comments.length, comments });
  } catch (error) {
    res.json({ message: "FAIL", error });
  }
};
