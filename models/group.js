
// Creating our Group model
module.exports = function (sequelize, DataTypes) {
  const Group = sequelize.define("Group", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPrivate: {
      type: DataTypes.BOOLEAN
    },
    adminUserId: {
      type: DataTypes.INTEGER,
    },
  });
  

return Group;
};
