const Discord = require("discord.js");
module.exports = (Bot, guild, user) => {
  Bot.bans.ensure(guild.id, []);
  Bot.bans.push(guild.id, user.id);
  Bot.serverConfig.ensure(guild.id, {
    serverID: message.guild.id,
    prefix: "$",
    welcomeMessageEnabled: true,
    xpSystem: true
  });

  const embed = new Discord.RichEmbed()
    .setAuthor("Ban Manager")
    .setDescription("A user has been banned.");
  if (Bot.serverConfig.get(guild.id, "mod-log")) {
    const id = Bot.serverConfig.get(guild.id, "mod-log");
    Bot.channels.find(f => f.id == id).send(embed);
  }
};
