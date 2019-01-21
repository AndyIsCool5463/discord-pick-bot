const Discord = require("discord.js");
let options = {
  maxAge: 600,
  maxUses: 1,
  unique: true
};

exports.run = async (Bot, message, args) => {
  if (message.channel.type === "dm") return;
  const embed = new Discord.RichEmbed();
  embed.setAuthor(message.author.username + " said:", message.author.avatarURL);
  embed.setColor("red");
  embed.setTitle("Join the voice chat on " + message.guild.name);
  embed.setTimestamp(new Date());
  embed.setFooter("Automated message", message.guild.iconURL);
  let targets = message.mentions.users.array();
  while (targets.length > 0) {
    const user = targets.pop();
    if (user.bot)
      message.channel.send("❌ Bots usually don't hang out with humans!");
    else {
      const channel = message.member.voiceChannel;
      if (channel == null) {
        embed.setDescription(
          "You can choose one of the voice channels and he will join you ASAP"
        );
        if (user === message.author)
          message.channel.send("🤔 Who invites himself anyway?");
        else {
          user.send(embed);
          message.channel.send("✅ " + user.username + " has been informed!");
        }
      } else {
        embed.setDescription(
          ":arrow_down: Click the button bellow to join him :arrow_down:"
        );
        if (!channel.members.has(user.id)) {
          message.channel.send("✅ " + user.username + " has been informed!");
          user.send(embed).then(
            message.member.voiceChannel
              .createInvite(options)
              .then(invite => user.send(invite.toString()))
              .catch(console.error)
          );
        } else {
          if (user === message.author)
            message.channel.send("🤔 Who invites himself anyway?");
          else
            message.channel.send(
              "❌ " + user.username + " is already in your voice channel!"
            );
        }
      }
    }
  }
};

exports.help = {
  name: "come",
  category: "Bot",
  description: "Invite!",
  usage: "come [user]",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
