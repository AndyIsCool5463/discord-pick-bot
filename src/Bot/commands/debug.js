const Discord = require("discord.js");
exports.run = async (Bot, message, args) => {
  let f = args[0];
  message.channel.send(`\` Key: ${f} \n XP: ${Bot.xpDB.get(f, "points")}\``);
};
exports.help = {
  name: "debug",
  category: "Economy",
  description: "Developer Debugging purposes.",
  usage: "",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
