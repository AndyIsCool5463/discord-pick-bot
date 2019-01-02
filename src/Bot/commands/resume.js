require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVideo = require("../functions/music/handleVideo.js");
exports.run = async (Bot, msg, args) => {
  if (Bot.serverQueue && !Bot.serverQueue.playing) {
    Bot.serverQueue.playing = true;
    Bot.serverQueue.connection.dispatcher.resume();
    return msg.channel.send("▶ Resumed the music for you!");
  }
  return msg.channel.send("There is nothing playing.");
};

exports.help = {
  name: "resume",
  category: "Music",
  description: "Resumes the music if it was paused.",
  usage: "resume",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: true
};
