require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVideo = require("../functions/music/handleVideo.js");
exports.run = async (Bot, msg, args) => {
  if (!msg.member.voiceChannel)
    return msg.channel.send("You are not in a voice channel!");
  if (!Bot.serverQueue)
    return msg.channel.send(
      "There is nothing playing that I could stop for you."
    );
  Bot.serverQueue.songs = [];
  Bot.serverQueue.connection.dispatcher.end("Stop command has been used!");
  return undefined;
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stops the music",
  usage: "stop",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: true
};
