const express = require("express");
var session = require("express-session"),
  passport = require("passport"),
  Strategy = require("passport-discord/lib").Strategy;
const checkAuth = require("./functions/checkAuth.js");
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
  server.listen(8080);
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
        callbackURL: "http://localhost:8080/callback",
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
        default:
          res.sendStatus(404);
      }
    }
  });
  // app.listen(port, () => console.log(`Dashboard listening on port ${port}!`));
};
