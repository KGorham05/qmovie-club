module.exports = function(sequelize, DataTypes) {
  const Movie = sequelize.define("Movie", {
    genre: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    imdbRating: {
      type: DataTypes.STRING,
    },
    streamingService: {
      type: DataTypes.STRING,
    },
    synopsis: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    tomatoes: {
      type: DataTypes.STRING,
    },
    releaseYear: {
      type: DataTypes.STRING,
    }
  });

  Movie.associate = function(models) {
    Movie.belongsToMany(models.Board, {
      through: "Boards_Movies"
    });
  };

  return Movie;
};
