// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const passport = require("passport");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    }
  });

  // GOOGLE API
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/members");
    }
  );

  /*
   * Here we've add our isAuthenticated middleware to this route.
   * If a user who is not logged in tries to access this route they will be redirected to the signup page
   */
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });

   // A route for displaying a particular groups page
   app.get('/group/:id', isAuthenticated, function(req, res) {
    // TO DO
    // Check if the user trying to access this route belongs to this group
    // if not, redirect them to the /members route
    res.sendFile(path.join(__dirname, "../public/group.html"));
    // if the are, show them that group's page
  });

};