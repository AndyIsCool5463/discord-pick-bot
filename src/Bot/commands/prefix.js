const fs = require("fs");
exports.run = async (Bot, message, args) => {
  const config = require(`../serverConfig/${message.guild.id}.json`);
  message.channel.send(
    `The default prefix for this guild is:\`${config.prefix}\` `
  );
};
exports.help = {
  name: "prefix",
  category: "s",
  description: "Displays Bot information.",
  usage: "botinfo",
  permission: "None",
  alias: "hi"
};
module.exports.settings = {
  disabled: false
};
