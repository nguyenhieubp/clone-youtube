const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const routerUser = require("../controllers/user.controller");

router.get("/listVideo/:user", routerUser.video);
router.put("/sub/:user", verifyToken, routerUser.subscribe);
router.put("/unSub/:user", verifyToken, routerUser.unSubscribe);
router.get("/listSub/:user", verifyToken, routerUser.listUserSub);
router.post("/subChannel/:user", verifyToken, routerUser.subChannel);
router.delete("/unSubChannel/:user", verifyToken, routerUser.unSubChannel);
router.get("/history", verifyToken, routerUser.history);
router.get("/listChannelSub/", verifyToken, routerUser.listChannelSub);

module.exports = router;
