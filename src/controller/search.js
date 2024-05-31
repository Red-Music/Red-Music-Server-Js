const { Music } = require("../models");
const { Op } = require("sequelize");

const SearchMusic = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "모든 값을 입력해주세요." });
  }
  try {
    const musics = await Music.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${title}%` } },
          { singer: { [Op.like]: `%${title}%` } },
        ],
      },
    });
    return res.status(200).json({ musics });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }
};

module.exports = { SearchMusic };
