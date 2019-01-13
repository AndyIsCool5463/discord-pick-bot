exports.run = async (Bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      `You need to supply what you want to change like this: \`${Bot.serverConfig.get(
        message.guild.id,
        "prefix"
      )}set prefix !\``
    );
  if (args[0] == "prefix") {
    if (!args[1])
      return message.channel.send(
        `You need to supply what you want to change like this: \`${Bot.serverConfig.get(
          message.guild.id,
          "prefix"
        )}set prefix !\``
      );
    Bot.serverConfig.set(message.guild.id, args[1], "prefix");
    message.channel.send(`Server prefix has been set to, \`${args[1]} \``);
    console.log(Bot.serverConfig.get(message.guild.id));
  } else if (args[0] == "mod-log") {
    Bot.serverConfig.set(message.guild.id, message.channel.id, "modlog");
    message.channel.send(
      `Mod-log Channel has been set to channel id: ${
        message.channel.id
      }/ Name: ${message.channel.name}`
    );
  } else if (args[0] == "welcomeChannel") {
    Bot.serverConfig.set(
      message.guild.id,
      message.channel.id,
      "welcomeChannel"
    );
    message.channel.send(
      `Welcome Channel has been set to channel id: ${
        message.channel.id
      }/ Name: ${message.channel.name}`
    );
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
