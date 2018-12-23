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
    const conf = {
      serverID: config.serverID,
      prefix: args[1],
      welcomeMessageEnabled: config.welcomeMessageEnabled
    };
    fs.writeFile(
      `./src/Bot/serverConfig/${message.guild.id}.json`,
      JSON.stringify(conf),
      function(err) {
        if (err) throw err;
        delete require.cache[require.resolve(`../events/message.js`)];
        delete require.cache[require.resolve(`./set.js`)];
        delete require.cache[
          require.resolve(`../serverConfig/${message.guild.id}.json`)
        ];
        console.log("Saved!");
        message.channel.send(`Prefix has been changed to \`${args[1]}\``);
      }
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
