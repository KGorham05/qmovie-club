module.exports = function(sequelize, DataTypes) {
  const Boards_Movies = sequelize.define("Boards_Movies", {
    numVotes: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0
    }
  });

  return Boards_Movies;
};
