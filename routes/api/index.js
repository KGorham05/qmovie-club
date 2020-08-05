const router = require("express").Router();
const boardRoutes = require("./boards");
const groupRoutes = require("./groups");
const movieRoutes = require("./movies");
const userRoutes = require("./users");

// board routes
router.use("/boards", boardRoutes);
router.use("/groups", groupRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);

module.exports = router;