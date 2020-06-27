module.exports = function(sequelize, DataTypes) {
  const Board = sequelize.define("Board", {
    nextShowing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leadingFilm: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Board.associate = function(models) {
    Board.belongsTo(models.Group, {
      foreignKey: {
        allowNull: false
      }
    });

    Board.belongsToMany(models.Movie, {
      through: "boards_movies"
    })
  };

  return Board;
};
