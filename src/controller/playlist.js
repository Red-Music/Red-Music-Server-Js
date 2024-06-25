const { Music, Playlist, User, Like } = require("../models");

const addPlaylist = async (req, res) => {
  const user = req.decoded;
  const { music_id } = req.body;
  console.log(user);

  if (!music_id) {
    return res.status(400).json({ message: "모든 값을 입력해주세요." });
  }

  try {
    const music = await Music.findOne({ where: { id: music_id } });
    if (!music) {
      return res.status(404).json({ message: "음악이 존재하지 않습니다." });
    }

    await Playlist.create({
      music_id: music_id,
      user_id: user.userId,
    });

    return res.status(201).json({ message: "플레이리스트 추가 성공" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }
};

const getPlaylist = async (req, res) => {
  const user = req.decoded;

  try {
    const playlist = await Playlist.findAll({
      where: { user_id: user.userId },
      include: [
        {
          model: Music,
        },
      ],
    });
    const likedMusicIds = (
      await Like.findAll({ where: { user_id: user.userId } })
    ).map((like) => like.music_id);

    // 각 음악에 대해 좋아요 여부를 확인하고 추가
    const playlistWithLikes = playlist.map((item) => {
      return {
        ...item.toJSON(),
        isLiked: likedMusicIds.includes(item.music.id),
      };
    });

    return res.status(200).json({ playlist: playlistWithLikes });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }
};

const deletePlaylist = async (req, res) => {
  const user = req.decoded;
  const { music_id } = req.body;
  try {
    const playlist = await Playlist.findOne({
      where: { user_id: user.userId, id: music_id },
    });
    if (!playlist) {
      return res
        .status(404)
        .json({ message: "플레이리스트에 음악이 존재하지 않습니다." });
    }
    await Playlist.destroy({
      where: { user_id: user.userId, id: music_id },
    });
    return res.status(200).json({ message: "플레이리스트 삭제 성공" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }
};

module.exports = { addPlaylist, getPlaylist, deletePlaylist };
