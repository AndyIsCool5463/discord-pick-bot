const fs = require("fs");
exports.run = async (Bot, message, args) => {
  message.channel.send(
    `The default prefix for this guild is:\`${Bot.serverConfig.get(
      message.guild.id,
      "prefix"
    )}\` `
  );
};
exports.help = {
  name: "prefix",
  category: "Developer",
  description: "Displays Bot information.",
  usage: "",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
