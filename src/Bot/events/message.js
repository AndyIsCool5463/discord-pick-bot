require("dotenv").config();
const Enmap = require("enmap");
module.exports = (Bot, message, member) => {
  if (message.channel.type == "dm") return;
  // Ignore all bots
  if (message.author.bot) return;
  if (message.channel === "dm") return;
  Bot.serverConfig.ensure(message.guild.id, {
    serverID: message.guild.id,
    prefix: "$",
    welcomeMessageEnabled: true,
    xpSystem: true
  });
  const config = Bot.serverConfig.get(message.guild.id);
  const prefix = config.prefix;

  if (config.xpSystem === true) {
    let guildID = message.guild.id;
    let userID = message.author.id;
    Bot.xpDB.ensure(`${guildID}-${userID}`, {
      user: userID,
      guild: guildID,
      points: 0,
      level: 0
    });
    const key = `${guildID}-${userID}`;
    Bot.xpDB.inc(key, "points");

    const curLevel = Math.floor(0.1 * Math.sqrt(Bot.xpDB.get(key, "points")));
    if (Bot.xpDB.get(key, "level") < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**!`);
      leveledup(Bot, message, guild, key);
      Bot.xpDB.set(key, curLevel, "level");
    }
  }
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(prefix) !== 0) return;
  if (message.isMentioned(Bot.user)) {
    message.reply(`Default prefix for this guild is: \`${prefix}\`. `);
  }

  // Our standard argument/command name definition.
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  var cmd = Bot.commands.get(command) || Bot.aliases.get(command);
  if (cmd == "None")
    return message.reply("That is not a valid Command.").then(m => {
      setTimeout(function() {
        m.delete();
      }, 10000);
    });
  if (!cmd)
    return message.reply("That is not a valid command.").then(m => {
      setTimeout(function() {
        m.delete();
      }, 10000);
    });
  if (cmd.settings.disabled === true)
    return message.reply("Command Is Disabled.").then(m => {
      setTimeout(function() {
        m.delete();
      }, 10000);
    });
  if (cmd.help.permission == "None") {
  } else if (cmd.help.permission == "OwnerBot") {
    if (message.author.id != process.env.ownerBot)
      return message.channel
        .send(
          "Only the Bot Owner can use the command... Debug: Code exited code **1**"
        )
        .then(m => {
          setTimeout(function() {
            m.delete();
          }, 10000);
        });
  } else if (message.member.hasPermission(cmd.help.permission) === false) {
    return message.channel
      .send("You do not have permission to execute this command")
      .then(m => {
        setTimeout(function() {
          m.delete();
        }, 10000);
      })
      .catch(console.error);
  }
  // If that command doesn't exist, silently exit and do nothing

  // Run the command
  cmd.run(Bot, message, args);
};
