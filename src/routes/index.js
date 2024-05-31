const express = require("express");
const router = express();

const User = require("./user");
const Music = require("./music");
const Playlist = require("./playlist");
const File = require("./file");
const Search = require("./search");

router.use("/user", User);
router.use("/music", Music);
router.use("/playlist", Playlist);
router.use("/file", File);
router.use("/search", Search);

module.exports = router;
