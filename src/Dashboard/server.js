const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
require("dotenv").config();
const handle = app.getRequestHandler();
var session = require("express-session");
var passport = require("passport");
var Strategy = require("../../node_modules/passport-discord/lib").Strategy;
const checkAuth = require("./functions/checkAuth.js");
module.exports = async () => {
  app
    .prepare()
    .then(() => {
      const server = express();

      server.get("*", (req, res) => {
        return handle(req, res);
      });

      // Discord AUthentication
      var scopes = [
        "identify",
        "email",
        /* 'connections', (it is currently broken) */ "guilds",
        "guilds.join"
      ];

      passport.use(
        new Strategy(
          {
            clientID: process.env.DISCORDCLIENTID,
            clientSecret: process.env.DISCORDCLIENTSECRET,
            callbackURL: "http://localhost:3000/callback",
            scope: scopes
          },
          function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
              return done(null, profile);
            });
          }
        )
      );

      server.use(
        session({
          secret: "keyboard cat",
          resave: false,
          saveUninitialized: false
        })
      );
      server.use(passport.initialize());
      server.use(passport.session());
      server.get(
        "/login",
        passport.authenticate("discord", { scope: scopes }),
        function(req, res) {}
      );

      server.get(
        "/Silentlogin",
        passport.authenticate("discord", { scope: scopes }),
        function(req, res) {}
      );

      server.get(
        "/callback",
        passport.authenticate("discord", { failureRedirect: "/discordError" }),
        function(req, res) {
          res.redirect("/udb");
        } // auth success
      );
      server.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/").end();
      });

      server.get("/udb", checkAuth, async function(req, res) {
        //  app.render("/dashboard");
        //console.log(req.user)
        //    res.json(req.user);
        //    const page = "/dashboard";
        //  //  const query = { json: res.json(req.user) };
        //    app.render("/dashboard");
        ///  res.json(req.user);
        //  res.json(req.user);
        const actualPage = "/dashboard";
        let guildsbotisin = await fetchUserData(req.user.id);
        const queryParams = {
          json: req.user,
          user: guildsbotisin
        };
        await app.render(req, res, actualPage, queryParams);
      });

      server.get("/udb/manage:id", checkAuth, function(req, res) {
        const actualPage = "/manage";
        const queryParams = {
          json: req.body.json
        };
        app.render(req, res, actualPage, queryParams);
      });

      // End

      server.listen(3000, err => {
        if (err) throw err;
        console.log("> Ready on http://localhost:3000");
      });
    })
    .catch(ex => {
      console.error(ex.stack);
      process.exit(1);
    });
};
