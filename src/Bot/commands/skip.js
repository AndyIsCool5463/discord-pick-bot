require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVideo = require("../functions/music/handleVideo.js");
exports.run = async (Bot, msg, args) => {
  if (!msg.member.voiceChannel)
    return msg.channel.send("You are not in a voice channel!");
  if (!serverQueue)
    return msg.channel.send(
      "There is nothing playing that I could skip for you."
    );
  Bot.serverQueue.connection.dispatcher.end("Skip command has been used!");
  return undefined;
  // Error Handling ^_^
};

exports.help = {
  name: "skip",
  category: "Music",
  description: "skips the current song.",
  usage: "skip",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: true
};
