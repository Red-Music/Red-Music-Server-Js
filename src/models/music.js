module.exports = (sequelize, DataTypes) => {
  return sequelize.define("music", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      // 제목
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    singer: {
      // 가수
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    album: {
      // 앨범
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    release_date: {
      // 발매일
      type: DataTypes.STRING(),
      allowNull: false,
    },
    genre: {
      // 장르
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lyrics: {
      // 가사
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subnail: {
      // 썸네일
      type: DataTypes.STRING(),
      allowNull: false,
    },
    music_file: {
      // 음악 파일
      type: DataTypes.STRING(),
      allowNull: false,
    },
  });
};
