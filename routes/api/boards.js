const router = require("express").Router();
const boardsController = require("../../controllers/boardsController");

// All routes will match on /api/boards

// Route for associating a movie with a board
router
  .route("/addMovie")
  .post(boardsController.addMovie)

// Route for getting a board & associated data by Id
router
  .route("/:id")
  .get(boardsController.findById)
  .put(boardsController.updateLeadingFilm)
  
module.exports = router;