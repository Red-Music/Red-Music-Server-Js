const express = require("express");
const router = express();

const User = require("./user");
const Music = require("./music");
const Playlist = require("./playlist");
const File = require("./file");
const Search = require("./search");
const Like = require("./like");

router.use("/user", User);
router.use("/music", Music);
router.use("/playlist", Playlist);
router.use("/file", File);
router.use("/search", Search);
router.use("/like", Like);

module.exports = router;
