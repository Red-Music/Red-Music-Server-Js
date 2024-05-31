const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/token");
const { upload } = require("../middleware/upload");

const controller = require("../controller/file");

router.post("/", verifyToken, upload.single("file"), controller.fileUpload);

module.exports = router;
