// MOVIE ROUTES
  // read by title
  app.get("/api/movie/:title", function(req, res) {
    db.Movie.findOne({
      where: {
        title: req.params.title,
      },
    })
      .then((dbMovie) => {
        console.log(dbMovie);
        res.json(dbMovie);
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  });

  // create movie
  app.post("/api/movie", function(req, res) {
    db.Movie.create(req.body)
      .then((dbMovie) => {
        console.log("MOVIE CREATED");
        res.json(dbMovie);
      })
      .catch((err) => {
        res.status(409).json(err);
      });
  });