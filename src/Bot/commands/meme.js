const Discord = require("discord.js");
const snekfetch = require("snekfetch");
exports.run = async (Bot, message, args) => {
  try {
    const { body } = await snekfetch
      .get("https://www.reddit.com/r/memes.json?sort=top&t=week")
      .query({ limit: 800 });
    const allowed = message.channel.nsfw
      ? body.data.children
      : body.data.children.filter(post => !post.data.over_18);
    if (!allowed.length)
      return message.channel.send(
        "It seems we are out of fresh memes!, Try again later."
      );
    const randomnumber = Math.floor(Math.random() * allowed.length);
    const embed = new Discord.RichEmbed()
      .setColor("#36393F")
      .setTitle(allowed[randomnumber].data.title)
      .setDescription("Posted by: " + allowed[randomnumber].data.author)
      .setImage(allowed[randomnumber].data.url)
      .addField(
        "Other info:",
        "Up votes: " +
          allowed[randomnumber].data.ups +
          " / Comments: " +
          allowed[randomnumber].data.num_comments
      )
      .setFooter("Memes provided by r/dankmemes");
    message.channel.send(embed);
  } catch (err) {
    return console.log(err);
  }
};
exports.help = {
  name: "meme",
  category: "Misc",
  description: "Fetches memes from r/dankmemes",
  usage: "meme",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
