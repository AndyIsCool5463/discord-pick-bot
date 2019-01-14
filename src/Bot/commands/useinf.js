exports.run = async (Bot, message, args) => {
  const m = message.mentions.users.first();
  message.channel.send(m.displayAvatarURL);
};
exports.help = {
  name: "us",
  category: "Economy",
  description: "",
  usage: "",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
