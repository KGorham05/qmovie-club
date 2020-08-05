const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// These routes match on /api/users

router
  .route("/")
  .get(usersController.findOne)

router
  .route("/resetVotes")
  .put(usersController.resetVotes)


