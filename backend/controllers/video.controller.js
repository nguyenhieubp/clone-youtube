const Video = require("../models/Video");
const History = require("../models/History");
const createError = require("../middlewares/errorHandle");

module.exports.createVideo = async (req, res, next) => {
  const newVideo = new Video({ ...req.body, author: req.user });
  try {
    await newVideo.save();
    res.json({ message: "SUCCESS", newVideo });
  } catch (error) {
    res.json({ message: "FAIL", error });
  }
};

module.exports.getVideo = async (req, res, next) => {
  const { idVideo } = req.params;
  const newHistory = new History({
    user: req.user,
    video: idVideo,
    date: new Date(),
  });
  try {
    await newHistory.save();
    await Video.findByIdAndUpdate(idVideo, {
      $inc: {
        view: 1,
      },
    });

    const video = await Video.findById(idVideo).populate(
      "author",
      "-email -password  -listVideo"
    );
    res.json({ message: "SUCCESS", video });
  } catch (error) {
    res.json({ message: "ERROR", error });
  }
};

module.exports.putVideo = async (req, res, next) => {
  //url image title desc
  const { idVideo } = req.params;
  const video = await Video.findById(idVideo);
  try {
    if (req.user === video.author.valueOf()) {
      const video = await Video.findByIdAndUpdate(
        idVideo,
        { $set: req.body },
        { new: true }
      );
      res.json({ message: "SUCCESS", video });
    } else {
      res.json({ message: "YOU NOT UPDATE VIDEO" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteVideo = async (req, res, next) => {
  const { idVideo } = req.params;
  const video = await Video.findById(idVideo);
  try {
    if (req.user === video.author.valueOf()) {
      await Video.findByIdAndDelete(idVideo);
      res.json({ message: "DELETE SUCCESS" });
    } else {
      res.json({ message: "YOU NOT DELETE VIDEO" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.likeVideo = async (req, res, next) => {
  const { idVideo } = req.params;
  try {
    await Video.findByIdAndUpdate(idVideo, {
      $addToSet: {
        like: req.user,
      },
      $pull: {
        disLike: req.user,
      },
    });
    res.json("Like success");
  } catch (error) {
    next(createError(error));
  }
};

module.exports.unLikeVideo = async (req, res, next) => {
  const videoUnLike = await Video.findById(req.params.video);
  const listUserLike = videoUnLike.like;
  const indexUserLike = listUserLike.findIndex((user) => {
    return user === req.user;
  });
  if (indexUserLike !== -1) {
    await Video.findByIdAndUpdate(
      req.params.video,
      { $pull: { like: req.user } },
      {
        new: true,
      }
    );
    res.json("unLike success");
  }
};

module.exports.unDisLikeVideo = async (req, res, next) => {
  const videoUnLike = await Video.findById(req.params.video);
  const listUserDisLike = videoUnLike.disLike;
  const indexUserDisLike = listUserDisLike.findIndex((user) => {
    return user === req.user;
  });
  if (indexUserDisLike !== -1) {
    await Video.findByIdAndUpdate(
      req.params.video,
      { $pull: { disLike: req.user } },
      {
        new: true,
      }
    );
    res.json("unDisLike success");
  }
};

module.exports.disLikeVideo = async (req, res, next) => {
  const { idVideo } = req.params;
  try {
    await Video.findByIdAndUpdate(idVideo, {
      $addToSet: { disLike: req.user },
      $pull: { like: req.user },
    });
    res.json("DisLike video");
  } catch (error) {
    next(createError(error));
  }
};

module.exports.videos = async (req, res, next) => {
  try {
    const videos = await Video.find().populate("author", "name avatar");
    res.json(videos);
  } catch (error) {
    next(createError(error));
  }
};

module.exports.listLike = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.video);
    const listUserLike = video.like;
    res.json(listUserLike);
  } catch (error) {
    next(createError(error));
  }
};

module.exports.listDisLike = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.video);
    const listUserDisLike = video.disLike;
    res.json(listUserDisLike);
  } catch (error) {
    next(createError(error));
  }
};
