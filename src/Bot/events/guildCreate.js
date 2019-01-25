module.exports = (Bot, guild) => {
  Bot.serverConfig.ensure(guild.id, {
    serverID: guild.id,
    prefix: "$",
    welcomeMessageEnabled: true,
    xpSystem: true
  });
  Bot.users
    .find("id", guild.ownerID)
    .send(
      `Thank you for inviting Pickbot! \n To set up this bot, please follow the tutorial at https://pickbot.glitch.me/docs ! \n We also have a custom dashboard to suit your needs without needing to be on discord! \n Check out all of the Bot features at the website!`
    );
};
