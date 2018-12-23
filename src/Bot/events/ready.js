module.exports = Bot => {
  const colors = require("chalk");
  Bot.user.setActivity(
    `Hosting ${Bot.guilds.size} servers with ${Bot.users.size} users!`
  );
  console.log(
    `${colors.yellow(
      `${Bot.user.username}#${Bot.user.discriminator}`
    )} is now ${colors.green(`online`)}!`
  );

  // Background Tasks
  let arr = Bot.categories
    .filter(i => {
      return i;
    })
    .map(c => {
      //console.log(c);
      return `${c}`;
    });

  var arrayUnique = function(arr) {
    return arr.filter(function(item, index) {
      return arr.indexOf(item) >= index;
    });
  };

  Bot.categoryArr = arrayUnique(arr).join(" , ");
};
