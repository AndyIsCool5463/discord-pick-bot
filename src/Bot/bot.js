require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const colors = require("chalk");
const Bot = new Discord.Client({
  disabledEvents: ["TYPING_START"]
});
const initdb = require("./functions/initalizeDatabases.js");
const initServer = require("../Dashboard/react-server");
Bot.login(process.env.TOKEN); // log bot in

module.exports = async () => {
  // Event Handler

  await initdb(Bot);
  await fs.readdir("./src/Bot/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      // Load the event file itself
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      Bot.on(eventName, event.bind(null, Bot));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
    console.log(colors.green(`Loaded ${files.length} events!`));
  });

  // Command Handler
  await fs.readdir("./src/Bot/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      Bot.commands.set(props.help.name, props);
      Bot.aliases.set(props.help.alias, props);
      Bot.permissions.set(props.help.name, props.help.permission);
      Bot.categories.set(props.help.name, props.help.category);
      console.log(`Loaded command: ${commandName} ✓ `);
    });
    console.log(colors.green(`Loaded ${files.length} commands!`));
    console.log(colors.yellow("Loaded Commands"));
  });
  // Initalize Databases..
  initServer(Bot);
};
