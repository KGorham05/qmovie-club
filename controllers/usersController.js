const db = require("../models");
// Try moving these to the models index.js
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  // Get user data
  // This seems to indicate that user data is already being sent to the front end, so I may be able to access it without this route
  findOne: function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      req.user.email 
        ? res.json({email: req.user.email, id: req.user.id}) 
        : res.json({firstName: req.user[0].firstName, lastName: req.user[0].lastName});
    } 
  },
  // Reset numVotes for all users
  resetVotes: function(req, res) {
    db.Users_Groups
      .update({numVotes: 3}, {where: {numVotes: {[Op.lte]: [2]}}})
      .then(updatedData => res.json({updatedData}))
      .catch(err => res.status(417).json(err))
  }
}
