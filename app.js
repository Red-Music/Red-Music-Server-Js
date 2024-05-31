const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./src/models");
const router = require("./src/routes/index");

const port = process.env.PORT || 8080;

require("dotenv").config();

const corsOptions = {
  origin: "*",
  method: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.set("jwt-secret", process.env.SECRET);

app.use("/", router);

app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
      console.error(err);
    });
});
