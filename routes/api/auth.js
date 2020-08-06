const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("../../config/passport");
// Routes will match on /api/auth

router.post("/signup", authController.signUp, passport.authenticate(["local", "google"]), authController.login)
 

router.post("/login", passport.authenticate(["local", "google"]), authController.login)

router
  .route("/logout")
  .get(authController.logout)

module.exports = router;
