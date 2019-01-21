const Discord = require("discord.js");
exports.run = async (Bot, message, args) => {
  const specifiedUser = message.mentions.members.first();
  console.log(specifiedUser.voiceChannelID);
  if (!specifiedUser) return message.reply("No user to move!");
  if (!specifiedUser.voiceChannelID)
    return message.reply("They're not in a voice Channel.");
  if (!args[1]) return message.reply("No Channel specified");
  console.log(
    message.guild.channels
      .filter(c => c.type == "voice" && c.name == args[1])
      .map(c => {
        specifiedUser.edit({
          channel: c.id
        });
      })
  );
};

exports.help = {
  name: "move",
  category: "Moderation",
  description: "Moves a member to a voiceChannel.",
  alias: "None",
  permission: "MOVE_MEMBERS"
};
module.exports.settings = {
  disabled: false
};
