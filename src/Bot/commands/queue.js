require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVideo = require("../functions/music/handleVideo.js");
exports.run = async (Bot, msg, args) => {
  if (!Bot.serverQueue) return msg.channel.send("There is nothing playing.");
  return msg.channel.send(`
__**Song queue:**__
${Bot.serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
**Now playing:** ${Bot.serverQueue.songs[0].title}
        `);
};

exports.help = {
  name: "queue",
  category: "Music",
  description: "Shows you the current queue for this guild.",
  usage: "queue",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: true
};
