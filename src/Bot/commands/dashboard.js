const Discord = require("discord.js");
const randomHex = require("../functions/randomHex.js");
exports.run = async (Bot, message, args) => {
  message.channel.send("http://localhost").then(m => {
    setTimeout(function() {
      m.delete();
    }, 30000);
  });
};
exports.help = {
  name: "dashboard",
  category: "Website",
  description: "Site.",
  usage: "dashbaord",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
