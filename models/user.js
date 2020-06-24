// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
const Group = require("./group");

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      // The email cannot be null, and must be a proper email before creation
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      // The password cannot be null
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      validate: {
        emailOrGoogleId() {
          if (this.email === null && this.googleId === null) {
            throw new Error(
              "You must enter an email or sign in with your Google account"
            );
          }
        },
      },
    }
  );
  User.associate = function(models) {
    User.belongsToMany(models.Group, { through: "users_groups" });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  /*
   * Hooks are automatic methods that run during various phases of the User Model lifecycle
   * In this case, before a User is created, we will automatically hash their password
   */
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};
