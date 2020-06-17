var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email",
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email,
        },
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email.",
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://q-movie-club.herokuapp.com/google/callback",
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      db.User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          password: "googleId",
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        }
      }).then((user) => {
        return done(null, user);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
