const express = require("express");
const router = express.Router();

const controller = require("../controller/users");

router.post("/signup", controller.signup); // 회원가입 user/signup userId, password
router.post("/signin", controller.signin); // 로그인 user/signin userId, password

module.exports = router;
