const db = require("../models");

module.exports = {

  signUp: function(req, res) {
    console.log("Hitting signup route")
    db.User
      .create(req.body)
      .then(dbUser => res.status(307).redirect("/login"))
      .catch(err => res.status(401).json(err))
  },

  login: function(req, res) {
    res.json({email: req.user.email, id: req.user.id})
  },

  logout: function(req, res) {
    req.logout();
    res.redirect("/")
  }

}