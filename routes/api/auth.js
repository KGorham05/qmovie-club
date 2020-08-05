const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// login
app.post("/api/login", passport.authenticate(["local", "google"]), function(
  req,
  res
) {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    email: req.user.email,
    id: req.user.id,
  });
});

// logout
app.get("/api/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// sign up
app.post("/api/signup", function(req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});