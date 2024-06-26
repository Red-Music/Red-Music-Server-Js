const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token =
    req.headers["authorization"]?.split("Bearer ")[1] || req.query.token;

  if (!token) {
    res.status(401).json({ message: "로그인이 필요합니다." });
    return;
  }

  try {
    return jwt.verify(token, req.app.get("jwt-secret"), (err, decoded) => {
      if (err) throw new Error(err.message);
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    console.error(err);

    return res.status(401).json({
      message: "로그인이 필요합니다.",
    });
  }
};

module.exports = { verifyToken };
