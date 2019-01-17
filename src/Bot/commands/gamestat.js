const Discord = require("discord.js");
const gamedig = require("gamedig");
exports.run = async (Bot, message, args) => {
  gamedig
    .query(
      {
        type: "unturned",
        host: "173.208.195.226:27015",
        maxAttempts: 10
      },
      s => {
        console.log(s);
      }
    )
    .then(s => {
      console.log(s);
    });
};
exports.help = {
  name: "gamestats",
  category: "Economy",
  description: "Fetches Game Stats",
  usage: "gamestats [game] [IP] [(OPTIONAL) PORT] ",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: true
};
