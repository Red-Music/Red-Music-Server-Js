const { Music } = require("../models");

const musicUpload = async (req, res) => {
  const {
    title,
    singer,
    album,
    release_date,
    genre,
    lyrics,
    subnail,
    music_file,
  } = req.body;

  if (
    !title ||
    !singer ||
    !album ||
    !release_date ||
    !genre ||
    !lyrics ||
    !subnail ||
    !music_file
  ) {
    res.status(400).json({ message: "모든 값을 입력해주세요." });
    return;
  }

  try {
    await Music.create({
      title: title,
      singer: singer,
      album: album,
      release_date: release_date,
      genre: genre,
      lyrics: lyrics,
      subnail: subnail,
      music_file: music_file,
    });

    return res.status(201).json({ message: "음악 업로드 성공" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "잘못된 요청입니다." });
    return;
  }
};

const musicList = async (req, res) => {
  const { page } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const musics = await Music.findAndCountAll({
      limit,
      offset,
    });

    if (musics.rows.length === 0) {
      return res.status(200).json({ message: "마지막 페이지 입니다.", musics });
    }

    return res.status(200).json({ musics });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "잘못된 요청입니다." });
    return;
  }
};

const musicDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findOne({ where: { id } });

    if (!music) {
      res.status(404).json({ message: "음악이 존재하지 않습니다." });
      return;
    }

    return res.status(200).json({ music });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "잘못된 요청입니다." });
    return;
  }
};

module.exports = {
  musicUpload,
  musicList,
  musicDetail,
};
