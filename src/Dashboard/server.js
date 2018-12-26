const express = require("express");
var session = require("express-session"),
  passport = require("passport"),
  Strategy = require("passport-discord/lib").Strategy;
const checkAuth = require("./functions/checkAuth.js");
const app = express();
const port = 8080;
module.exports = async Bot => {
  var scopes = [
    "identify",
    "email",
    /* 'connections', (it is currently broken) */ "guilds",
    "guilds.join"
  ];

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
    res.render("dashboard.ejs", { data: req.user });
  });
  app.get("/dashboard/edit/:serverID/:editing", checkAuth, function(req, res) {
    res.sendStatus(501);
  });
  app.listen(port, () => console.log(`Dashboard listening on port ${port}!`));
};
