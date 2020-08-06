const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("../../config/passport");

router.post("/signup", authController.signUp, passport.authenticate(["local", "google"]), authController.login)
router.post("/login" , passport.authenticate(["local", "google"]), authController.login)
router.get("/logout" , authController.logout)

module.exports = router;
