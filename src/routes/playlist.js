const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/token");

const controller = require("../controller/playlist");

router.post("/", verifyToken, controller.addPlaylist); // 플레이리스트 추가 playlist/
router.get("/", verifyToken, controller.getPlaylist); // 플레이리스트 조회 playlist/
router.delete("/", verifyToken, controller.deletePlaylist); // 플레이리스트 삭제 playlist/

module.exports = router;
