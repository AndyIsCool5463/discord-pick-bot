const fs = require("fs");
module.exports = (Bot, guild) => {
  const conf = {
    serverID: guild.id,
    prefix: "$",
    welcomeMessageEnabled: "true"
  };
  console.log(guild);
  async function f() {
    await fs.unlink(`./src/Bot/serverConfig/${message.guild.id}.json`, e => {
      console.log(e);
    });
  }
  f();
  fs.appendFileSync(
    `./src/Bot/serverConfig/${guild.id}.json`,
    JSON.stringify(conf),
    function(err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
  console.log(`File written to: ${guild.id}`);
};
