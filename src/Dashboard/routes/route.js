var express = require("express");
var router = express.Router();
var admin = require("../functions/admins.js");
router.get("/", (req, res) => {
  console.log(req.isAuthenticated());
  res.render("index.ejs", {
    isAuth: req.isAuthenticated(),
    user: req.user,
    admins: admin
  }); //  { isAuth: req.isAuthenticated() }
});
module.exports = router;
