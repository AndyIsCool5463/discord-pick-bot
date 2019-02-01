const Discord = require("discord.js");
module.exports = (Bot, guild, user) => {
  Bot.bans.ensure(guild.id, []);
  Bot.bans.push(guild.id, user.id);
  Bot.serverConfig.ensure(guild.id, {
    serverID: guild.id,
    prefix: "$",
    welcomeMessageEnabled: true,
    xpSystem: true
  });

  const embed = new Discord.RichEmbed()
    .setAuthor("Ban Manager")
    .setImage(user.displayAvatarURL)
    .setDescription(
      `${user.username}#${user.discriminator} has been banned from ${
        guild.name
      }.`
    );
  if (!Bot.serverConfig.has(guild.id, "modlog"))
    return console.log("They litterally have no mod-log channel..??????");
  const id = Bot.serverConfig.get(guild.id, "modlog");
  Bot.channels.get(id).send(embed);
};
