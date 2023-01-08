const express = require("express");
const router = express.Router();

const routerVideo = require("../controllers/video.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, routerVideo.createVideo);
router.get("/watching/:idVideo", verifyToken, routerVideo.getVideo);
router.get("/", routerVideo.videos);
router.put("/:idVideo", verifyToken, routerVideo.putVideo);
router.delete("/:idVideo", verifyToken, routerVideo.deleteVideo);
router.put("/like/:idVideo", verifyToken, routerVideo.likeVideo);
router.put("/unLike/:video", verifyToken, routerVideo.unLikeVideo);
router.put("/unDisLike/:video", verifyToken, routerVideo.unDisLikeVideo);
router.put("/disLike/:idVideo", verifyToken, routerVideo.disLikeVideo);
router.get("/listLike/:video", routerVideo.listLike);
router.get("/listDisLike/:video", routerVideo.listDisLike);

module.exports = router;
