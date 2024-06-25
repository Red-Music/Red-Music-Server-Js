const { Music, Playlist, User, Like } = require("../models");
const sequelize = require("sequelize");
const likeMusic = async (req, res) => {
  const { music_id } = req.body;
  const { userId } = req.decoded;

  if (!music_id) {
    return res.status(400).json({ message: "모든 값을 입력해주세요." });
  }

  try {
    const music = await Music.findOne({ where: { id: music_id } });
    if (!music) {
      return res.status(404).json({ message: "음악이 존재하지 않습니다." });
    }

    const like = await Like.findOne({
      where: { music_id },
    });
    if (like) {
      await like.destroy();
      return res.status(200).json({ message: "좋아요 취소 성공", like: false });
    } else {
      await Like.create({
        music_id: music_id,
        user_id: userId,
      });
      return res.status(201).json({ message: "좋아요 성공", like: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }
};

const popularMusic = async (req, res) => {
  try {
    const likes = await Like.findAll({
      attributes: [
        "music_id",
        [sequelize.fn("COUNT", sequelize.col("music_id")), "like_count"],
      ],
      group: "music_id",
    });

    const musicIds = likes
      .filter((like) => like.dataValues.like_count > 0)
      .sort((a, b) => b.dataValues.like_count - a.dataValues.like_count)
      .map((like) => like.dataValues.music_id);

    const musics = await Music.findAll({
      attributes: [
        "id",
        "title",
        "singer",
        "album",
        "release_date",
        "genre",
        "lyrics",
        "subnail",
        "music_file",
        "createdAt",
        "updatedAt",
        [sequelize.fn("COUNT", sequelize.col("likes.music_id")), "like_count"],
      ],
      include: [
        {
          model: Like,
          attributes: [],
          where: {
            music_id: {
              [sequelize.Op.in]: musicIds,
            },
          },
        },
      ],
      group: ["Music.id"],
      order: [[sequelize.literal("like_count"), "DESC"]],
      limit: 10,
      subQuery: false,
    });

    return res.status(200).json({ musics });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }
};

module.exports = { likeMusic, popularMusic };
