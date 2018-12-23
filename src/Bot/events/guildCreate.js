const fs = require("fs");
module.exports = (Bot, guild) => {
  const conf = {
    serverID: guild.id,
    prefix: "$",
    welcomeMessageEnabled: "true"
  };
  console.log(guild);
  fs.appendFile(
    `./src/Bot/serverConfig/${guild.id}.json`,
    JSON.stringify(conf),
    function(err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
  console.log(`File written to: ${guild.id}`);
};
