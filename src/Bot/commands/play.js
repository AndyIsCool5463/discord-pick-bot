const Discord = require("discord.js");
exports.run = async (Bot, message, args) => {
  // eslint-disable-line no-unused-vars
  Bot.generateInvite([
    "SEND_MESSAGES",
    "MANAGE_GUILD",
    "MENTION_EVERYONE",
    "ADMINISTRATOR"
  ])
    .then(link => {
      const embed = new Discord.RichEmbed()
        .setThumbnail(Bot.user.displayAvatarURL)
        .setAuthor(Bot.user.username, Bot.user.displayAvatarURL)
        .setTitle(`${Bot.user.username}`)
        .addField(`Invite URL:`, `[Here](${link})`)
        .setColor(
          "#" +
            Math.random()
              .toString(16)
              .slice(2, 8)
              .toUpperCase()
        )
        .addField("User generated Invite.", message.author)
        .setFooter(`Automated Invite Generator.`);
      //     message.channel.send(`Heres your code! **${i.url}** \n`)
      message.channel.send(embed);
    })
    .catch(console.error);
};
exports.help = {
  name: "gv",
  category: "ot",
  description: "Generate a Bot invite for your own server!",
  usage: "genBoInv",
  permission: "Nne",
  alias: "btinv"
};
module.exports.settings = {
  disabled: false
};
