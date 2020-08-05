const router      = require("express").Router();
const boardRoutes = require("./boards");
const groupRoutes = require("./groups");
const userRoutes  = require("./users");
const movieRoutes = require("./movies");
const authRoutes  = require("./auth");

// board routes
router.use("/boards", boardRoutes);
router.use("/groups", groupRoutes);
router.use("/users" , userRoutes);
router.use("/movies", movieRoutes);
router.use("/auth"  , authRoutes);

module.exports = router;
