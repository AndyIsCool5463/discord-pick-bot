exports.run = async (Bot, message, args) => {
  message.channel.send("F");
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
