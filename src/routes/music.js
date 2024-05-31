const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/token");

const controller = require("../controller/music");

router.get("/", verifyToken, controller.musicList); // 음악 리스트 music/?page
router.get("/:id", verifyToken, controller.musicDetail); // 음악 상세보기 music/:id
router.post("/", verifyToken, controller.musicUpload); // 음악 업로드 music/ title, singer, album, release_date, genre, lyrics, subnail, music_file

module.exports = router;
