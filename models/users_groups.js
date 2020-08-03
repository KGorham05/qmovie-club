module.exports = function(sequelize, DataTypes) {
  const Users_Groups = sequelize.define("Users_Groups", {
    numVotes: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 3
    }
  });

  return Users_Groups;
};