const db = require("../models");
const passport = require("../config/passport");
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  /*
   * Using the passport.authenticate middleware with our local strategy.
   * If the user has valid login credentials, send them to the members page.
   * Otherwise the user will be sent an error
   */
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

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // USER ROUTES -> Move to a controller

  /*
   * Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
   * how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
   * otherwise send back an error
   */

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

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      console.log("No user logged in");
      res.json({});
    } else {
      req.user.email
        ? res.json({
            email: req.user.email,
            id: req.user.id,
          })
        : res.json({
            firstName: req.user[0].firstName,
            lastName: req.user[0].lastName,
          });
    }
  });

  // GROUP ROUTES -> Move to its own controller

  // Route for creating a new group
  app.post("/api/groups", function(req, res) {
    db.Group.create({
      name: req.body.name,
      description: req.body.description,
      isPrivate: req.body.isPrivate,
      adminUserId: req.body.adminUserId,
    })
      .then(function(dbGroup) {
        dbGroup.addUser(req.body.adminUserId).then(function() {
          console.log("******")
          db.Board.create({
            GroupId: dbGroup.id
          })
          console.log("******")
        })
        // Send the group data to front end
        res.status(201).send(dbGroup);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for getting group and it's users data
  app.get("/api/users_groups/:id", function(req, res) {
    db.Group.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User,
        {
          model: db.Board,
          where: {
            isActive: true
          }
        }]
    }).then(function(dbData) {
      res.json(dbData)         
    })
  })
  
 


};

