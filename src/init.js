const init = require("./Bot/bot.js");
const colors = require("chalk");
const server = require("./Dashboard/server.js");
module.exports = () => {
  init();
  console.log(colors.blue("Started Bot & Dashboard!"));
};
