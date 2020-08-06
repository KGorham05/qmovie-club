const path = require("path");
const passport = require("passport");
var router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function(req, res) {
  console.log("Index route")
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  } else {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  }
});

router.get("/login", function(req, res) {
  console.log("Hitting login route")
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  } else {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  }
});

router.get("/signup", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  } else {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  }
});

// GOOGLE API
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
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
router.get("/members", isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/about.html"));
});

// A route for displaying a particular groups page
router.get("/group/:id", isAuthenticated, function(req, res) {
  // TO DO
  // Check if the user trying to access this route belongs to this group
  // currently performing this check on the front end, could be hacked
  // if not, redirect them to the /members route
  res.sendFile(path.join(__dirname, "../public/group.html"));
  // if the are, show them that group's page
});

module.exports = router;