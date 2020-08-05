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
    db.Boards_Movies
      .update({numVotes: req.body.votes}, {where: {MovieId: req.body.movieId, BoardId: req.body.boardId}})
      .then(dbMovie => res.json(dbMovie))
      .catch(err => res.status(500).json(err))
  },
  // Find movie by title
  findByTitle: function(req, res) {
    db.Movie
      .findOne({where: {title: req.params.title})
      .then(dbMovie => res.json(dbMovie))
      .catch(err => res.status(404).json(err));
  },
  
}


