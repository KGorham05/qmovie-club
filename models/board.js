module.exports = function(sequelize, DataTypes) {
  const Board = sequelize.define("Board", {
    nextShowing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leadingFilm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    currentTheme: {
      type: DataTypes.STRING,
      defaultValue: "Favorite Films"
    },
    showTime: {
      type: DataTypes.STRING,
    },
    timeZone: {
      type: DataTypes.STRING
    }
  });

  Board.associate = function(models) {
    Board.belongsTo(models.Group, {
      foreignKey: {
        allowNull: false
      }
    });

    Board.belongsToMany(models.Movie, {
      through: "Boards_Movies"
    })
  };

  return Board;
};
  