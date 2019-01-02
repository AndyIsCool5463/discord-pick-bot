require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVideo = require("../functions/music/handleVideo.js");
exports.run = async (Bot, msg, args) => {
  if (Bot.serverQueue && Bot.serverQueue.playing) {
    Bot.serverQueue.playing = false;
    Bot.serverQueue.connection.dispatcher.pause();
    return msg.channel.send("⏸ Paused the music for you!");
  }
  return msg.channel.send("There is nothing playing.");
};

exports.help = {
  name: "pause",
  category: "Music",
  description: "Pauses the music for you.",
  usage: "pause",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: true
};
