const Discord = require("discord.js");
const randomHex = require("../functions/randomHex.js");
exports.run = async (Bot, message, args) => {
  const key = args[1];
  const msg = args.splice(2).join(" ");
  console.log(key, msg);
};
exports.help = {
  name: "encrypt",
  category: "Administration",
  description: "Bans the user specified.",
  usage: "ban [user]",
  permission: "BAN_MEMBERS",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
