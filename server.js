if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
// Use morgan when debugging routes
// const morgan = require("morgan");
const session = require("express-session");
const passport = require("./config/passport");
const routes = require("./routes");
const db = require("./models");
const PORT = process.env.PORT || 8080;
const forceSync = false;

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// })
const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);
// TODO -> Move routes to their own controller, add express router
app.use(routes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: forceSync }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
