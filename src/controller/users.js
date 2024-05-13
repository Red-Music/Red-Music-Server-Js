const { User } = require("../models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    res.status(400).json({ message: "아이디와 비밀번호를 입력해주세요." });
    return;
  }

  try {
    const db_user_id = await User.findOne({ where: { user_id: userId } });
    if (db_user_id) {
      res.status(409).json({ message: "이미 존재하는 회원입니다." });
      return;
    }

    const salt = crypto.randomBytes(32).toString("hex");
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 2, 32, "sha512")
      .toString("hex");

    await User.create({ user_id: userId, password: hashPassword, salt });

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "잘못된 요청입니다." });
    return;
  }
};

const signin = async (req, res) => {
  const { userId, password } = req.body;
  const secretKey = req.app.get("jwt-secret");

  if (!userId || !password) {
    res.status(400).json({ message: "아이디와 비밀번호를 입력해주세요." });
    return;
  }

  try {
    const user = await User.findOne({ where: { user_id: userId } });
    if (!user) {
      res.status(404).json({ message: "존재하지 않는 회원입니다." });
      return;
    }

    const hashPassword = crypto
      .pbkdf2Sync(password, user.salt, 2, 32, "sha512")
      .toString("hex");

    if (hashPassword !== user.password) {
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "로그인 성공",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "잘못된 요청입니다." });
    return;
  }
};

module.exports = { signup, signin };
