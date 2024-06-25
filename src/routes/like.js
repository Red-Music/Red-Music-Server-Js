const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/token");

const controller = require("../controller/like");

router.post("/", verifyToken, controller.likeMusic);
router.get("/", controller.popularMusic);

module.exports = router;
