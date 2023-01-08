const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const routerComment = require("../controllers/comment.controller");

router.post("/:video", verifyToken, routerComment.createComment);
router.get("/:video", routerComment.getComment);

module.exports = router;
