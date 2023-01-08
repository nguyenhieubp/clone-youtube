const User = require("../models/User");
const createError = require("../middlewares/errorHandle");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    ...req.body,
    password: hash,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    next(createError(500, error));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(300, "Not have email !"));
    } else {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.APP_SECRET);
        const { password, ...rest } = user._doc;
        res.json({ message: "SUCCESS", token, user: rest });
      } else {
        return next(createError(300, "Password not matches !"));
      }
    }
  } catch (error) {
    next(createError(500, error));
  }
};

module.exports.checkCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      res.json({ message: "NULL", user: null });
    } else {
      const user = await User.findById(req.user.id);
      const { password, ...rest } = user._doc;
      res.json({ message: "SUCCESS", user: rest });
    }
  } catch (error) {
    next(createError(500, error));
  }
};
