const fs = require("fs-extra");

exports.run = async (Bot, message, args) => {
  const defaultConf = {
    serverID: `${message.guild.id}`,
    prefix: "$",
    welcomeMessageEnabled: "true"
  };

  const config = require(`../serverConfig/${message.guild.id}.json`);

  if (args[0] == "raw") {
    message.channel.send(
      `\`\`\`json
        
        ${JSON.stringify(config)}
        \`\`\``
    );
  } else {
    message.channel.send(
      `\`\`\`json
        "Server ID": "${config.id}",

        "Prefix": "${config.prefix}"
        \`\`\``
    );
  }
};
exports.help = {
  name: "config",
  category: "Configuration",
  description: "Displays Bot Config for this guild.",
  usage: "config",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
