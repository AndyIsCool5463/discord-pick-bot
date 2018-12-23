module.exports = (Bot, message, member) => {
  if (message.channel.type == "dm") return;
  // Ignore all bots
  if (message.author.bot) return;
  if (message.channel === "dm") return;
  const config = require(`../serverConfig/${message.guild.id}.json`);
  const prefix = config.prefix;
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  var cmd = Bot.commands.get(command) || Bot.aliases.get(command);
  if (cmd == "None") return message.reply("That is not a valid Command.");
  if (!cmd) return message.reply("That is not a valid command.");
  if (cmd.settings.disabled === true)
    return message.reply("Command Is Disabled.");
  if (cmd.help.permission == "None") {
  } else if (cmd.help.permission == "OwnerBot") {
    if (message.author.id != "f")
      return message.channel.send(
        "Only the Bot Owner can use the command... Debug: Code exited code **1**"
      );
  } else if (message.member.hasPermission(cmd.help.permission) === false) {
    return message.channel
      .send("You do not have permission to execute this command")
      .catch(console.error);
  }
  // If that command doesn't exist, silently exit and do nothing

  // Run the command
  cmd.run(Bot, message, args);
};
