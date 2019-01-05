const fs = require("fs");
exports.run = async (Bot, message, args) => {
  const config = require(`../serverConfig/${message.guild.id}.json`);
  if (!args[0] || !args[1])
    return message.channel.send(
      `You need to supply what you want to change like this: \`${
        config.prefix
      }set prefix !\``
    );
  if (args[0] == "prefix") {
    Bot.serverConfig.set(message.guild.id, args[1], "prefix");
    message.channel.send(`Server prefix has been set to, \`${args[1]} \``);
    console.log(Bot.serverConfig.get(message.guild.id));
  }
};
exports.help = {
  name: "set",
  category: "Configuration",
  description: "Changes guild config.",
  usage: "set ... ...",
  permission: "ADMINISTRATOR",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
