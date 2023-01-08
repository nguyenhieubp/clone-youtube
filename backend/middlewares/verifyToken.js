const jwt = require("jsonwebtoken");
const createError = require("./errorHandle");

const verifyToken = (req, res, next) => {
  //   const Authorization = req.header("Authorization");
  const Authorization = req.header("authorization");

  if (!Authorization) {
    next(createError(300, "please login"));
  }
  const token = Authorization.replace("Bearer ", "");
  const { id } = jwt.verify(token, process.env.APP_SECRET);
  req.user = id;
  next();
};

module.exports = verifyToken;
