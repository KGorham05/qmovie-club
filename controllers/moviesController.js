const db = require("../models");

// Defining methods for the boardsController
module.exports = {
  // Add movie to the DB
  createMovie: function(req, res) {
    db.Movie
      .create(req.body)
      .then((dbMovie) => res.json(dbMovie))
      .catch((err) => res.status(409).json(err));
  },
  // Update a movie's numVotes
  addVote: function(req, res) {
    console.log(req.user)
    // check if the user has any votes for this boards by querying the users_groups table
    db.Users_Groups.findOne({
      where: {
        GroupId: req.body.groupId,
        UserId: req.user.id
      }
    }).then(dbUser => {
      let usersVotes = dbUser.numVotes;
      console.log(usersVotes);
      if (usersVotes > 0) {
        db.Boards_Movies
        .update({numVotes: req.body.votes}, {where: {MovieId: req.body.movieId, BoardId: req.body.boardId}})
        .then(dbMovie => {
          usersVotes--;
          console.log(usersVotes);
          db.Users_Groups.update(
            {numVotes: usersVotes}, 
            {where: {
              GroupId: req.body.groupId,
              UserId: req.user.id
            }}
          ).then(dbUser => {
            res.json(dbMovie) // decrement user's numVotes by one in the DB
          })
          .catch(err => res.status(500).json(err))
        }) 
        .catch(err => res.status(500).json(err))
      } else {
        console.log("No votes left!")
        res.json({numVotes: 0})
      }
    })
    
    
  },
  // Find movie by title
  findByTitle: function(req, res) {
    db.Movie
      .findOne({where: {title: req.params.title}})
      .then(dbMovie => res.json(dbMovie))
      .catch(err => res.status(404).json(err));
  },
  
}


