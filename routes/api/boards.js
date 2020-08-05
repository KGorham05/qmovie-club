const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  // .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;




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
  app.put("/api/boards_movies/", function(req, res) {
    db.Boards_Movies.update(
      {
        numVotes: req.body.votes,
      },
      {
        where: {
          MovieId: req.body.movieId,
          BoardId: req.body.boardId,
        },
      }
    )
      .then((dbRecord) => {
        res.json(dbRecord);
      })
      .catch((err) => {
        res.status(500).json(err);
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
          model: db.Movie
        },
      }).then((dbBoard_Movies) => {
        res.json(dbBoard_Movies);
      });
    });