module.exports = (Bot, member) => {
  Bot.serverConfig.ensure(member.guild.id, {
    serverID: member.guild.id,
    prefix: "$",
    welcomeMessageEnabled: true,
    welcomeMessage: "Welcome ${member} to the guild!",
    welcomeChannel: ""
  });
  if (!Bot.serverConfig.get(member.guild.id, "welcomeChannel")) return;
};
