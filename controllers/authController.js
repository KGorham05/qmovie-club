module.exports = {

  signUp: function(req, res) {
    db.User
      .create(req.body)
      .then(dbUser => res.redirect(307, "/api/login"))
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