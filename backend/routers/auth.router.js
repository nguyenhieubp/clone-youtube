const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const checkCurrentUser = require("../middlewares/checkCurrentUser");
const routerAuth = require("../controllers/auth.controller");

router.post("/register", routerAuth.register);
router.post("/login", routerAuth.login);
router.get("/checkCurrentUser", checkCurrentUser, routerAuth.checkCurrentUser);

module.exports = router;
