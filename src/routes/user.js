const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/token");

const controller = require("../controller/users");

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);

module.exports = router;
