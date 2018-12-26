const Discord = require("discord.js");
exports.run = async (Bot, message, args) => {
  message.channel.send("``` ✿ Dashboard:  UP ✿ Bot: UP ✿ Github: DOWN ```");
};
exports.help = {
  name: "status",
  category: "Github",
  description: "Shows Status.",
  usage: "status || uptime",
  permission: "None",
  alias: "uptime"
};
module.exports.settings = {
  disabled: false
};
