const init = require("./Bot/bot.js");
const colors = require("chalk");
module.exports = () => {
  init();
  console.log(colors.blue("Started Bot & Dashboard!"));
};
