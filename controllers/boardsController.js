const db = require("../models");

// Defining methods for the boardsController
module.exports = {
  // Add movie to a board
  addMovie: function(req, res) {
    db.Boards_Movies
      .create({MovieId: req.body.MovieId, BoardId: req.body.BoardId})
      .then((dbMovie) => res.json(dbMovie))
      .catch((err) => res.status(409).json(err));
  },
  // Find a board by ID & populate all related data
  findById: function(req, res) {
    db.Board
      .findOne({where: {id: req.params.id}, include: {model: db.Movie}})
      .then(dbBoard => res.json(dbBoard))
      .catch(err => res.status(422).json(err));
  },
  
  // Need to create a method and route for hanlding archiving a board, and creating a new one 
}


