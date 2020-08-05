const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get user data
app.get("/api/user", function(req, res) {
  if (!req.user) {
    console.log("No user logged in");
    res.json({});
  } else {
    req.user.email
      ? res.json({
          email: req.user.email,
          id: req.user.id,
        })
      : res.json({
          firstName: req.user[0].firstName,
          lastName: req.user[0].lastName,
        });
  }
});

// Route for resetting the numVotes for all users, that will run on a cron job
app.put("/api/users", function(req, res) {
  db.Users_Groups.update(
    {
      numVotes: 3,
    },
    {
      where: {
        numVotes: {
          [Op.lte]: [3],
        },
      },
    }
  ).then((dbUsers) => {
    console.log("Votes Reset");
    res.json({
      reset: true,
    });
  });
});
