const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const { get } = require("snekfetch"); // This is to fetch the user avatar and convert it to a buffer.
const imageUrlRegex = /\?size=2048$/g; // 2048 Avatar Pic
exports.run = async (Bot, message, args) => {
  Canvas.registerFont(
    resolve(join(__dirname, "../Fonts/whitney.ttf")),
    "Discord"
  );
  const key = `${message.guild.id}-${message.author.id}`;
  Bot.xpDB.ensure(`${message.guild.id}-${message.author.id}`, {
    user: message.author.id,
    guild: message.guild.id,
    points: 0,
    level: 0
  });
  const user = Bot.xpDB.get(key);
  const { body: avatar } = await get(
    message.author.displayAvatarURL.replace(imageUrlRegex, "?size=128")
  );
  const name =
    message.author.username.length > 20
      ? message.author.username.substring(0, 17) + "..."
      : message.author.username;

  async function profile(member, score) {
    return (
      new Canvas(400, 180)
        // Create the Blurple rectangle on the right side of the image.
        .setColor("#7289DA")
        .addRect(84, 0, 316, 180)
        .setColor("#2C2F33")
        .addRect(0, 0, 84, 180)
        .addRect(169, 26, 231, 46)
        .addRect(224, 108, 176, 46)
        .setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
        .setShadowOffsetY(5) // Drop the shadow by 5 pixels.
        .setShadowBlur(10) // Blur the shadow by 10.
        .save() // We should save the instance again.
        // This circle is 2 pixels smaller in the radius to prevent a pixel border.
        .addCircle(84, 90, 62)
        .addRoundImage(avatar, 20, 26, 128, 128, 64)
        // Now we restore the canvas' previous state.
        .setTextAlign("center")
        // I'm using a custom font, which I will show you how to add next.
        .setTextFont("10pt Discord")
        // Set the colour to white, since we have a dark background for all the text boxes.
        .setColor("#FFFFFF")
        // Add the name variable.
        .addText(name, 285, 54)
        // Using template literals, you can add text and variables, we're applying the toLocaleString()
        // to break up the number into a nice readable format.
        // Now we want to align the text to the left.
        .setTextAlign("left")
        // Let's add all the points!
        .addText(`Score: ${user.points.toLocaleString()}`, 241, 136)
        .restore()
        .createBeveledClip(20, 138, 128, 32, 5)
        .setColor("#23272A")
        .addRect(20, 138, 128, 32)
        .restore()
        .setTextFont("10pt Discord")
        // Set the colour to white, since we have a dark background for all the text boxes.
        .setColor("#FFFFFF")
        .addText(`Level: ${user.level.toLocaleString()}`, 84, 159)
        // Add all of the text for the template.
        // Let's center the text
        .toBufferAsync()
    );
  }
  await message.channel.send(
    new Attachment(
      await profile(message.author, Bot.xpDB.get(key)),
      `profile-${message.author.id}.jpg`
    )
  );
};
exports.help = {
  name: "rank",
  category: "Economy",
  description: "",
  usage: "",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
