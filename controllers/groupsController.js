const db = require("../models");

module.exports = {
  // Create a group, add user to the group, create a board for the group
  createGroup: function(req, res) {
    db.Group
      .create({
        name: req.body.name,
        description: req.body.description,
        isPrivate: req.body.isPrivate,
        adminUserId: req.body.adminUserId,
      })
      .then(dbGroup => dbGroup.addUser(req.body.adminUserId))
      .then(dbUser => {
        db.Board.create({
          GroupId: dbGroup.id,
          nextShowing: req.body.nextShowing,
          currentTheme: req.body.firstTheme,
          timeZone: req.body.timeZone,
          showTime: req.body.showTime
        })
      })
      .then(dbBoard => res.status(201).json(dbBoard))
      .catch(err => res.status(401).json(err));
  },
  // Find group data by Id
  findById: function(req, res) {
    db.Group
      .findOne({where: {id: req.params.id}, include: [db.User, {model: db.Board, where: {isActive: true}}]})
      .then(dbData => res.json(dbData))
      .catch(err => res.status().json(err));
  }
  
};




