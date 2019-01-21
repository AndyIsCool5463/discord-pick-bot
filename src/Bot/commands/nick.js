exports.run = async (Bot, message, args) => {
  const specifiedUser = message.mentions.members.first();
  if (!specifiedUser) return message.reply("No user to move!");
  var nick = args.slice(1).join(" ");
  specifiedUser.edit({
    nick: nick
  });
};
exports.help = {
  name: "nick",
  category: "Moderation",
  description: "Change yours or someone's elses nickname.",
  usage: "nick [MENTION USER] [NICKNAME]",
  permission: "MANAGE_NICKNAMES",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
