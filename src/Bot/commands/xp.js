const Discord = require("discord.js");
exports.run = async (Bot, message, args) => {
  Bot.xpDB.ensure(`${message.guild.id}-${message.guild.id}`, {
    user: message.author.id,
    guild: message.guild.id,
    points: 0,
    level: 0
  });
  const key = `${message.guild.id}-${message.author.id}`;
  const embed = new Discord.RichEmbed()
    .setAuthor("XP table")
    .addField("Level:", Bot.xpDB.get(key, "level"))
    .addField("XP:", Bot.xpDB.get(key, "points"));
  message.channel.send(embed);
};
exports.help = {
  name: "xp",
  category: "Economy",
  description: "Displays your XP as embed",
  usage: "xp [User]",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
