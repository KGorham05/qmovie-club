const router = require("express").Router();
const moviesController = require("../../controllers/moviesController");

// All routes will match on /api/movies
router
  .route("/")
  .post(moviesController.createMovie);

router
  .route("/addVote")
  .put(moviesController.addVote);

router
  .route("/:title")
  .get(moviesController.findByTitle);

module.exports = router;