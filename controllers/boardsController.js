const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book
      .findAll({})
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findOne({ where: {id: req.params.id}})
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book
    .create({
      title: req.body.title,
      synopsis: req.body.synopsis,
      author: req.body.author,
    })
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
};


