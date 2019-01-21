const Discord = require("discord.js");
exports.run = async (Bot, message, args) => {
  const Gamedig = require("gamedig");
  Gamedig.query({
    type: args[0],
    host: args[1],
    port: args[2]
  })
    .then(async game => {
      await game.players.forEach(c => {
        return playerlist.push(c.name);
      });
      var playerlist = [];
      let embed = await new Discord.RichEmbed()
        .setAuthor("Game Stats")
        .setTitle(game.name)
        .setImage(
          `https://steamcdn-a.akamaihd.net/steam/apps/${
            game.raw.gameid
          }/header.jpg`
        )
        .setColor("#FFF")
        .addField("Game", game.raw.game)
        .addField("Map:", game.map)
        .addField("Require Password?", game.password)
        .addField(`Server IP`, `steam://connect/${game.connect}`)
        .addField("Players", playerlist)
        .setFooter(
          `${game.raw.numplayers} Players /${game.raw.numbots} Bots/ Max: ${
            game.maxplayers
          }`
        );
      message.channel.send(embed);
    })
    .catch(error => {
      console.log("Server is offline");
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
  disabled: false
};
