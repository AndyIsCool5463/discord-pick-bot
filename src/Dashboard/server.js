const express = require("express");
var session = require("express-session"),
  passport = require("passport"),
  Strategy = require("passport-discord/lib").Strategy;
const checkAuth = require("./functions/checkAuth.js");
const colors = require("chalk");
const app = express();
//const port = 8080;
const ejsLint = require("ejs-lint");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var route = require("./routes/route");
var login = require("./routes/login");
var admins = require("./functions/admins.js");
module.exports = async Bot => {
  function fetchTime() {
    return (duration = moment
      .duration(Bot.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]"));
  }
  var user;
  console.log(colors.red(process.env.OAUTHCALLBACK));
  var scopes = [
    "identify",
    "email",
    /* 'connections', (it is currently broken) */ "guilds",
    "guilds.join"
  ];
  server.listen(process.env.PORT);
  app.set("view engine", "ejs");
  app.use(express.static(__dirname + "/public"));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(
    new Strategy(
      {
        clientID: process.env.DISCORDCLIENTID,
        clientSecret: process.env.DISCORDCLIENTSECRET,
        callbackURL: process.env.OAUTHCALLBACK,
        scope: scopes
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
          return done(null, profile);
        });
      }
    )
  );

  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/", route);
  app.get(
    "/login",
    passport.authenticate("discord", { scope: scopes }),
    function(req, res) {}
  );
  app.get(
    "/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/");
    } // auth success
  );
  app.get("/adb", (req, res) => {
    if (!req.user) return res.redirect("/not-found");
    if (req.user.id != "201825529333153792") return res.redirect("/not-found");
    if (req.user.id == "201825529333153792")
      return res.render("./bootstrap/admin/db.ejs", {
        user: req.user,
        isAuth: req.isAuthenticated()
      });
  });
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  app.get("/user/settings", checkAuth, function(req, res) {
    res.render("./bootstrap/user/userSettings.ejs", {
      user: req.user,
      isAuth: req.isAuthenticated()
    });
  });
  app.get("/docs", function(req, res) {
    res.redirect("https://spaghetti-coders.gitbook.io/discord-pick-bot/");
  });
  app.get("/stats", (req, res) => {
    const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    var vars = {
      ping: Math.round(Bot.ping) + "ms",
      memory: mem,
      users: Bot.users.size.toLocaleString(),
      guildZ: Bot.guilds.size.toLocaleString(),
      version: `v${version}`,
      nversion: process.version,
      uptime: fetchTime(),
      env: {
        port: process.env.PORT,
        server: process.env.server
      }
    };
    res.render("./bootstrap/statistics.ejs", {
      user: req.user,
      isAuth: req.isAuthenticated(),
      vars: vars
    });
  });
  app.get("/dashboard", checkAuth, function(req, res) {
    var guilds = Bot.guilds.filter(g => g.ownerID == req.user.id);
    user = req.user;
    res.render("./bootstrap/dashboard/home.ejs", {
      user: req.user,
      isAuth: req.isAuthenticated(),
      guilds: guilds,
      Bot: Bot
    });
  });
  app.get("/dashboard/:a", checkAuth, (req, res) => {
    var guilds = Bot.guilds.filter(g => g.ownerID == req.user.id);
    res.render(`./bootstrap/dashboard/${req.params.a}.ejs`, {
      user: req.user,
      isAuth: req.isAuthenticated(),
      guilds: guilds,
      Bot: Bot
    });
  });
  io.on("connection", function(socket) {
    socket.on("news", data => {
      console.log(data);
    });
    socket.on("fetchTime", d => {
      io.emit("returnTime", {
        time: fetchTime()
      });
    });
    socket.on("fetchPing", d => {
      io.emit("returnPing", {
        time: Math.round(Bot.ping) + "ms"
      });
    });
    socket.on("GETIDGUILD", data => {
      console.log(data);
      var f = Bot.guilds.find("name", data.name);
      io.emit("RESPONSEIDGUILD", f);
    });
    socket.on("commandCreated", d => {
      console.log(d);
    });
    socket.on("broadcast", d => {
      console.log(d);
      if (!d.msg) return;
      if (!d.guild) return;
      let msg = d.msg;
      let channel = d.channel;
      Bot.channels.find("id", channel).send(msg);
    });
    socket.on("addXP", d => {
      console.log(d);
      if (d.xp === null) return;
      const key = d.key;
      const guildServer = Bot.guilds.find("id", d.guild).ownerID;
      if (guildServer != d.userID) return;
      Bot.xpDB.math(key, "+", d.xp, "points");
    });
    socket.on("subXP", d => {
      console.log(d);
      if (d.xp === null) return;
      const key = d.key;
      const guildServer = Bot.guilds.find("id", d.guild).ownerID;
      if (guildServer != d.userID) return;
      Bot.xpDB.math(key, "-", d.xp, "points");
    });
    socket.on("fetchChannels", d => {
      let guild = d.guild;
      let f = Bot.channels
        .filter(g => g.guild.id == guild && g.type == "text")
        .map(c => {
          return {
            id: c.id,
            name: c.name
          };
        });
      io.emit("channelsResp", {
        channels: f
      });
    });
    socket.on("ban", res => {
      const f = Bot.guilds
        .filter(g => g.id == res.guild && g.ownerID == res.userBanning)
        .map(g => {
          return g;
        });
      if (f[0].ownerID == res.userBanning) {
        const ripThisPerson = res.ban;
        f[0]
          .ban(ripThisPerson, {
            reason: "Banned on admin dashboard."
          })
          .then(u => {
            io.emit("banned", {
              info: "suc"
            });
          });
      } else {
        return io.emit("banned", {
          info: "dang"
        });
      }
    });
  });

  app.get("/dashboard/edit/:userID/:serverID/:editing", checkAuth, function(
    req,
    res
  ) {
    const params = req.params;
    const serverid = params.serverID;
    const change = params.editing;
    const user = params.userID;
    var guildFind = function() {
      const f = Bot.guilds.find("id", serverid);
      if (!f) return res.sendStatus(401).end();
      return f.ownerID;
    };
    if (user != guildFind()) {
      res.send(401);
    } else {
      var guild = Bot.guilds.get(serverid);
      switch (change) {
        case "commands":
          res.render("dashboardCommands.ejs", {
            guild: guild,
            Bot: Bot,
            user: req.user
          });
          break;
        case "settings":
          // res.render("dashboardSettings.ejs", {
          //   guild: guild,
          //   Bot: Bot,
          //   user: req.user
          // });
          res.sendStatus(501);
          break;
        case "manage":
          res.render("management.ejs", {
            guild: guild,
            Bot: Bot,
            user: req.user
          });
          break;
        default:
          res.sendStatus(404);
      }
    }
  });
  app.get(
    "/dashboard/edit/:userID/:serverID/:editing/:funct",
    checkAuth,
    (req, res) => {
      const params = req.params;
      const serverid = params.serverID;
      const change = params.editing;
      const user = params.userID;
      const funct = params.funct;
      var guildFind = function() {
        const f = Bot.guilds.find("id", serverid);
        if (!f) return res.sendStatus(401).end();
        return f.ownerID;
      };
      if (user != guildFind()) {
        return res.sendStatus(401).end();
      } else {
        var guild = Bot.guilds.get(serverid);
        switch (funct) {
          case "broadcast":
            res.render("./bootstrap/dashboard/GuildOnlineMessagingPage.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user,
              isAuth: req.isAuthenticated(),
              env: {
                server: process.env.server
              }
            });
            break;
          case "kick":
            // res.render("dashboardSettings.ejs", {
            //   guild: guild,
            //   Bot: Bot,
            //   user: req.user
            // });
            res.sendStatus(501);
            break;
          case "ban":
            res.render("bans.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user,
              env: {
                server: process.env.server
              }
            });
            break;
          case "memberlist":
            res.render("./bootstrap/dashboard/GuildMembersPage.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user,
              isAuth: req.isAuthenticated(),
              env: {
                server: process.env.server
              }
            });
            break;
          case "config":
            res.render("./bootstrap/dashboard/GuildHomePage.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user,
              isAuth: req.isAuthenticated(),
              env: {
                server: process.env.server
              }
            });
            break;
          case "xpsys":
            res.render("./bootstrap/dashboard/GuildExperiencePage.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user,
              isAuth: req.isAuthenticated(),
              env: {
                port: process.env.PORT,
                server: process.env.server
              }
            });
            break;
          case "testing":
            res.render("Bootstrap.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user
            });
            break;
          case "commands":
            res.render("./bootstrap/dashboard/GuildCommandsPage.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user,
              isAuth: req.isAuthenticated()
            });
            break;
          case "modules":
            res.render("./bootstrap/dashboard/GuildModulesPage.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user,
              isAuth: req.isAuthenticated()
            });
            break;
          default:
            res.sendStatus(404);
            break;
        }
      }
    }
  );
  app.get("*", function(req, res) {
    res.render("./bootstrap/not_found.ejs");
  });
  // app.listen(port, () => console.log(`Dashboard listening on port ${port}!`));
};
