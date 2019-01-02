require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVideo = require("../functions/music/handleVideo.js");
exports.run = async (Bot, msg, args) => {
  if (!Bot.serverQueue) return msg.channel.send("There is nothing playing.");
  return msg.channel.send(
    `🎶 Now playing: **${Bot.serverQueue.songs[0].title}**`
  );
};

exports.help = {
  name: "np",
  category: "Music",
  description: "Shows you the Now playing song.",
  usage: "volume [1-20]",
  permission: "None",
  alias: "nowplaying"
};
module.exports.settings = {
  disabled: true
};
