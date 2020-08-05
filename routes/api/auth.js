const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("../config/passport");
// Routes will match on /api/auth

router
  .route("/signup")
  .post(authController.signUp)

router
  .route("/login", passport.authenticate(["local", "google"]))
  .post(authController.login)

router
  .route("/logout")
  .get(authController.logout)

module.exports = router;
