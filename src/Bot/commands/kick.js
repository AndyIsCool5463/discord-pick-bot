const Discord = require("discord.js");
const randomHex = require("../functions/randomHex.js");
exports.run = async (Bot, message, args) => {
  const specifiedUser = message.mentions.users.first();
  var string = args.slice(1).join(" ");
  console.log(string);
  if (!string) {
    string = "No Reason.";
  }
  if (!specifiedUser) return message.reply("Mention a user to kick!");
  if (specifiedUser.kickable === true) {
    const banningMsg = message.channel.send(
      `Kicking \` ${specifiedUser.username} \` `
    );
    const embed = await new Discord.RichEmbed()
      .setAuthor(`${specifiedUser.username}#${specifiedUser.discriminator}`)
      .setColor(randomHex())
      .setThumbnail(specifiedUser.displayAvatarURL)
      .addField("Kicked by:", message.author.username)
      .addField("Kick Reason:", string)
      .addField("Guild:", message.guild.name)
      .setTimestamp(new Date())
      .setFooter("F for respects.");
    await message.channel.send(embed);
    specifiedUser.kick(string);
    banningMsg.delete();
  } else {
    return message.reply("You may not kick that person.");
  }
};
exports.help = {
  name: "kick",
  category: "Administration",
  description: "Kicks the user.",
  usage: "kick [MENTION_USER]",
  permission: "KICK_MEMBERS",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
