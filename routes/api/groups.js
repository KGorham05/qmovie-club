
  // GROUP ROUTES -> Move to its own controller
  // Route for creating a new group
  app.post("/api/groups", function(req, res) {
    db.Group.create({
      name: req.body.name,
      description: req.body.description,
      isPrivate: req.body.isPrivate,
      adminUserId: req.body.adminUserId,
    }).then(function(dbGroup) {
      dbGroup.addUser(req.body.adminUserId).then(function(dbUser) {
        db.Board.create({
          GroupId: dbGroup.id,
          nextShowing: req.body.nextShowing,
          currentTheme: req.body.firstTheme,
          timeZone: req.body.timeZone,
          showTime: req.body.showTime,
        })
          .then((dbBoard) => {
            console.log("***");
            console.log(dbBoard);
            console.log("***");
            // Send the group data to front end
            res.status(201).json(dbBoard);
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });
    });
  });

  // Route for getting a group's data
  app.get("/api/users_groups/:id", function(req, res) {
    db.Group.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        db.User,
        {
          model: db.Board,
          where: {
            isActive: true,
          },
        },
      ],
    }).then(function(dbData) {
      res.json(dbData);
    });
  });

