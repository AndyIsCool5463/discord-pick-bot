const express = require("express");
var session = require("express-session"),
  passport = require("passport"),
  Strategy = require("passport-discord/lib").Strategy;
const checkAuth = require("./functions/checkAuth.js");
const colors = require("chalk");
const app = express();
let port = 80;
const { version } = require("discord.js");
module.exports = async Bot => {
  /* 
    JSON ENDPOINTS
    */
  app.get("/user/:userid/:guildid/info", function(req, res) {
    var params = req.params;
    var isOwner;
    try {
      assfs = Bot.guilds.find("id", params.guildid);
      console.log(assfs);
      isOwner = assfs.ownerID;
    } catch (e) {
      return console.log(e);
    }
    if (params.userid == isOwner) {
      try {
        var user = {
          status: {
            code: "200"
          },
          info: {
            username: Bot.users.get(params.userid).username,
            discriminator: Bot.users.get(params.userid).discriminator
          }
        };
      } catch (e) {
        console.log(e);
      }
    } else {
      res.json(401, "Not Authorized");
    }
    res.json(user);
  });
  app.listen(port, () => console.log(`Dashboard listening on port ${port}!`));
};
