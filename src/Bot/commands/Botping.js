const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
exports.run = (Bot, msg, args) => {
  const duration = moment
    .duration(Bot.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");
  const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
  const embed = new Discord.RichEmbed()
    .setColor(0x2ed32e)
    .setAuthor(Bot.user.username, Bot.user.avatarURL)
    .setThumbnail(Bot.user.displayAvatarURL)
    .addField("My Name:", `${Bot.user.username}#${Bot.user.discriminator}`)
    .addField("My ID:", Bot.user.id)
    .addField("My Ping:", Math.round(Bot.ping) + "ms")
    .addField("Memory Usage:", `${mem} MB`)
    .addField("Uptime:", duration)
    .addField("Users:", Bot.users.size.toLocaleString())
    .addField("Discord.js Version:", `v${version}`)
    .addField("Node.js Version", `${process.version}`);
  msg.channel.send(embed);
};
exports.help = {
  name: "binfo",
  category: "Bot",
  description: "Generates a Bot invite for your own server!",
  usage: "genBotInv",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
