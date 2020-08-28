const router = require("express").Router();
const groupsController = require("../../controllers/groupsController");

// Routes will match on /api/groups
router 
  .route("/")
  .post(groupsController.createGroup)
  .get(groupsController.findPublicGroups)

router
  .route("/:id")
  .get(groupsController.findById)
  .post(groupsController.joinPrivateGroup)


module.exports = router;
  
