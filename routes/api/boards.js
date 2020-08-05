const router = require("express").Router();
const boardsController = require("../../controllers/boardsController");

// Matches with "/api/boards"

// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   // .put(booksController.update)
//   .delete(booksController.remove);

// Route for associating a movie with a board
router
  .route("/movie")
  .post(boardsController.movie)

// Route for getting a board & associate data by Id
router
  .route("/:id")
  .get(boardsController.findById)



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
  
 
  
  module.exports = router;