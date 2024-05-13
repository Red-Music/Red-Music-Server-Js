const Sequelize = require("sequelize");
const config = require("../config/config");
const db = {};

const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  dialect: config.dialect,
  ...config,
  sync: false,
});

db.User = require("./user")(sequelize, Sequelize);
db.Music = require("./music")(sequelize, Sequelize);
db.Playlist = require("./playlist")(sequelize, Sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User.hasMany(db.Playlist, { foreignKey: "user_id", sourceKey: "id" });
db.Playlist.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

db.Music.hasMany(db.Playlist, { foreignKey: "music_id", sourceKey: "id" });
db.Playlist.belongsTo(db.Music, { foreignKey: "music_id", targetKey: "id" });

module.exports = db;
