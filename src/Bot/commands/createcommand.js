exports.run = async (Bot, message, args) => {
  console.log(args);
  if (!args[0]) return message.reply("enter a command name.");
  if (!args[1]) return message.reply("enter a command output.");
  const name = args[0];
  const output = args[1];
};
exports.help = {
  name: "createcommand",
  category: "ServerAdmin",
  description: "Creates Command.",
  usage: "createcommand [COMMAND_NAME] [OUTPUT]",
  permission: "ADMINISTRATOR",
  alias: "ccmd"
};
module.exports.settings = {
  disabled: false
};
