const User = require("./user");
// Creating our Group model
module.exports = function(sequelize, DataTypes) {
  const Group = sequelize.define("Group", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
    },
    adminUserId: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.STRING,
    }
  });

  Group.associate = function(models) {
    Group.belongsToMany(models.User, {
      through: "Users_Groups",
    });

    Group.hasMany(models.Board, {
      foreignKey: {
        allowNull: false
      }
    });
    
  };

  return Group;
};
