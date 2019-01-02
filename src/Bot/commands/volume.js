require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVideo = require("../functions/music/handleVideo.js");
exports.run = async (Bot, msg, args) => {
  if (!msg.member.voiceChannel)
    return msg.channel.send("You are not in a voice channel!");
  console.log(Bot.serverQueue);
  if (!Bot.serverQueue) return msg.channel.send("There is nothing playing.");

  if (!args[0])
    return msg.channel.send(
      `The current volume is: **${Bot.serverQueue.volume}**`
    );
  Bot.serverQueue.volume = args[0];
  Bot.serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
  return msg.channel.send(`I set the volume to: **${args[0]}**`);
};

exports.help = {
  name: "volume",
  category: "Music",
  description: "Adjusts the volume of the current playlist.",
  usage: "volume [1-20]",
  permission: "None",
  alias: "vol"
};
module.exports.settings = {
  disabled: true
};
