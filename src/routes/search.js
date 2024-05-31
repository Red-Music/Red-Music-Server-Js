const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/token");

const controller = require("../controller/search");

router.get("/", verifyToken, controller.SearchMusic);

module.exports = router;
