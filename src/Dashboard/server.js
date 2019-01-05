const express = require("express");
var session = require("express-session"),
  passport = require("passport"),
  Strategy = require("passport-discord/lib").Strategy;
const checkAuth = require("./functions/checkAuth.js");
const colors = require("chalk");
const app = express();
//const port = 8080;
var server = require("http").Server(app);
var io = require("socket.io")(server);

module.exports = async Bot => {
  var scopes = [
    "identify",
    "email",
    /* 'connections', (it is currently broken) */ "guilds",
    "guilds.join"
  ];
  server.listen(80);
  app.set("view engine", "ejs");
  app.use(express.static(__dirname + "/public"));
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });
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
        callbackURL: "http://localhost:80/callback",
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
  app.get(
    "/login",
    passport.authenticate("discord", { scope: scopes }),
    function(req, res) {}
  );
  app.get(
    "/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/dashboard");
    } // auth success
  );
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  app.get("/dashboard", checkAuth, function(req, res) {
    var guilds = Bot.guilds.filter(g => g.ownerID == req.user.id);
    // console.log(guilds);
    res.render("dashboard.ejs", {
      data: req.user,
      guilds: guilds,
      Bot: Bot
    });
  });

  io.on("connection", function(socket) {
    socket.on("news", data => {
      console.log(data);
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
    socket.on("fetchChannels", d => {
      let guild = d.guild;
      let f = Bot.channels
        .filter(g => g.guild.id == guild && g.type == "text")
        .map(c => {
          return c;
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
              bannedUser: u
            });
          });
      } else {
        return io.emit("401");
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
        res.send(401);
      } else {
        var guild = Bot.guilds.get(serverid);
        switch (funct) {
          case "broadcast":
            res.render("broadcast.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user
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
              user: req.user
            });
            break;
          case "memberlist":
            res.render("memberlist.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user
            });
            break;
          case "config":
            res.render("config.ejs", {
              guild: guild,
              Bot: Bot,
              user: req.user
            });
            break;
          default:
            res.sendStatus(404);
        }
      }
    }
  );
  // app.listen(port, () => console.log(`Dashboard listening on port ${port}!`));
};
