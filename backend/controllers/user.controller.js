const createError = require("../middlewares/errorHandle");
const User = require("../models/User");
const Video = require("../models/Video");
const History = require("../models/History");
const Sub = require("../models/Sub");
module.exports.subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.params.user,
      {
        $addToSet: {
          subscribeUser: req.user,
        },
      },
      {
        new: true,
      }
    );
    res.json("Subscription successfully.");
  } catch (error) {
    next(createError(error));
  }
};

module.exports.unSubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.params.user,
      {
        $pull: {
          subscribeUser: req.user,
        },
      },
      {
        new: true,
      }
    );
    res.json("UNSubscription successfully.");
  } catch (error) {
    next(createError(error));
  }
};

module.exports.video = async (req, res, next) => {
  try {
    const video = await Video.find({ author: req.params.user }).populate(
      "author",
      "name"
    );
    res.json({ message: "SUCCESS", length: video.length, video });
  } catch (error) {
    next(createError(error));
  }
};

module.exports.history = async (req, res, next) => {
  try {
    const videos = await History.find({ user: req.user }).sort({ date: -1 });
    const videoHistory = [
      ...new Map(videos.map((video) => [video["video"], video])).values(),
    ];
    const list = await Promise.all(
      videoHistory.map((video) => {
        return Video.findById(video.video).populate("author", "name");
      })
    );
    res.json(list);
  } catch (error) {
    next(createError(error));
  }
};

module.exports.subChannel = async (req, res, next) => {
  const newChannel = new Sub({ user: req.user, userSub: req.params.user });
  try {
    await newChannel.save();
    res.json({ messages: "SUB SUCCESS" });
  } catch (error) {
    next(createError(error));
  }
};

module.exports.unSubChannel = async (req, res, next) => {
  try {
    await Sub.deleteMany({ user: req.user, userSub: req.params.user });
    res.json("UN SUB CHANNEL SUCCESS");
  } catch (error) {
    next(createError(error));
  }
};

module.exports.listUserSub = async (req, res, next) => {
  try {
    const channelUserSub = await User.findById(req.params.user);
    const listUserSub = channelUserSub.subscribeUser;
    res.json(listUserSub);
  } catch (error) {
    next(createError(error));
  }
};

module.exports.listChannelSub = async (req, res, next) => {
  try {
    const channelSubs = await Sub.find({ user: req.user });
    const detailChannels = await Promise.all(
      channelSubs.map((item) => {
        return User.findById(item.userSub).select("name avatar");
      })
    );
    res.json(detailChannels);
  } catch (error) {
    next(createError(error));
  }
};
