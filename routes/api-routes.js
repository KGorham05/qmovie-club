const db = require("../models");
const passport = require("../config/passport");
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // USER ROUTES -> Move to a controller

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
  app.get("/logout", function(req, res) {
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

  // get user data
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
    }).then(function(dbGroup) {
      dbGroup
        .addUser(req.body.adminUserId)
        .then(function() {
          db.Board.create({
            GroupId: dbGroup.id,
            nextShowing: req.body.nextShowing,
            currentTheme: req.body.firstTheme,
            timeZone: req.body.timeZone,
            showTime: req.body.showTime,
          });
        })
        .then((dbData) => {
          // Send the group data to front end
          res.status(201).send(dbData);
        })
        .catch(function(err) {
          res.status(401).json(err);
        });
    });
  });

  // Route for getting a group's data
  app.get("/api/users_groups/:id", function(req, res) {
    db.Group.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        db.User,
        {
          model: db.Board,
          where: {
            isActive: true,
          },
        },
      ],
    }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Route for getting a group's active board's movies, and numVotes for each
  app.get("/api/group/movies/:boardId", function(req, res) {
    // query board, including the associated movies
    db.Board.findOne({
      where: {
        id: req.params.boardId,
      },
      include: {
        model: db.Movie,
        through: {
          attributes: ["numVotes"],
        },
      },
    }).then((dbBoard_Movies) => {
      res.json(dbBoard_Movies);
    });
  });

  // MOVIE ROUTES
  // read by title
  app.get("/api/movie/:title", function(req, res) {
    db.Movie.findOne({
      where: {
        title: req.params.title,
      },
    })
      .then((dbMovie) => {
        console.log(dbMovie);
        res.json(dbMovie);
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  });

  // create movie
  app.post("/api/movie", function(req, res) {
    db.Movie.create(req.body)
      .then((dbMovie) => {
        console.log("MOVIE CREATED");
        res.json(dbMovie);
      })
      .catch((err) => {
        res.status(409).json(err);
      });
  });

  // Route for associating a movie with a board
  app.post("/api/boards_movies/", function(req, res) {
    db.Boards_Movies.create({
      MovieId: req.body.MovieId,
      BoardId: req.body.BoardId,
    })
      .then((dbRecord) => {
        res.json(dbRecord);
      })
      .catch(function(err) {
        console.log(err);
        res.status(409).json(err);
      });
  });

  // add vote to a board_movie record
  app.put("/api/boards_movies/:id", function(req, res) {
    db.Boards_Movies.update(
      {
        numVotes: req.body.votes,
      },
      {
        where: {
          MovieId: req.params.id,
        }
      }
    )
      .then((dbRecord) => {
        res.json(dbRecord);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};
