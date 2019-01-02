const Discord = require("discord.js");
const randomHex = require("../functions/randomHex.js");
exports.run = async (Bot, message, args) => {
  const specifiedUser = message.mentions.users.first();
  var string = args.slice(1).join(" ");
  console.log(string);
  if (!string) {
    string = "No Reason.";
  }
  if (!specifiedUser) return message.reply("Mention a user to ban!");
  if (specifiedUser.bannable === true) {
    const banningMsg = message.channel.send(
      `Banning \` ${specifiedUser.username} \` `
    );
    const embed = await new Discord.RichEmbed()
      .setAuthor(`${specifiedUser.username}#${specifiedUser.discriminator}`)
      .setColor(randomHex())
      .setThumbnail(specifiedUser.displayAvatarURL)
      .addField("Banned by:", message.author.username)
      .addField("Ban Reason:", string)
      .addField("Guild:", message.guild.name)
      .setTimestamp(new Date())
      .setFooter("F for respects.");
    await message.channel.send(embed);
    specifiedUser.ban();
    banningMsg.delete();
    specifiedUser.ban();
  } else {
    return message.reply("You may not ban that person.");
  }
};
exports.help = {
  name: "ban",
  category: "Administration",
  description: "Bans the user specified.",
  usage: "ban [user]",
  permission: "BAN_MEMBERS",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
