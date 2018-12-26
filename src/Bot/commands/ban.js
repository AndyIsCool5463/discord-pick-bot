const Discord = require("discord.js");
exports.run = async (Bot, message, args) => {
    if(!args[0]) return message.channel.send("Supply a user to ban.");
    const user = args[0];
    
};
exports.help = {
  name: "ban",
  category: "Administration",
  description: "Bans the user specified.",
  usage: "ban [user]",
  permission: "BAN_MEMBERS",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
