const db = require("../models");

module.exports = {
  // Create a group, add user to the group, create a board for the group
  createGroup: function(req, res) {
    db.Group.create({
      name: req.body.name,
      description: req.body.description,
      isPrivate: req.body.isPrivate,
      adminUserId: req.body.adminUserId,
      password: req.body.password,
    }).then((dbGroup) => {
      dbGroup.addUser(req.body.adminUserId).then((dbUser) => {
        db.Board.create({
          GroupId: dbGroup.id,
          nextShowing: req.body.nextShowing,
          currentTheme: req.body.firstTheme,
          timeZone: req.body.timeZone,
          showTime: req.body.showTime,
        })
          .then((dbBoard) => res.status(201).json(dbBoard))
          .catch((err) => res.status(401).json(err));
      });
    });
  },
  // Find group data by Id
  findById: function(req, res) {
    console.log("Getting Group Data");
    db.Group.findOne({
      where: { id: req.params.id },
      include: [
        { model: db.User, attributes: ["id"] },
        {
          model: db.Board,
          where: { isActive: true },
          include: { model: db.Movie },
        },
      ],
    })
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(404).json(err));
  },
  // Get all Publig Groups
  findPublicGroups: function(req, res) {
    db.Group.findAll({
      where: {
        isPrivate: 0
      }
    })
      .then(dbGroups => res.json(dbGroups))
      .catch(err => res.status(200).json(err))
  }

};
