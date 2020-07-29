$(document).ready(function() {
  console.log("page loaded");
  // Load the groups info based of the current URL
  const pathname = window.location.pathname;
  const groupId = pathname.split("/")[2];
  let currentUser = null;
  let currentUserIsAdmin = false;
  let adminUserId = null;
  let movieAlreadySaved = false;
  let currentBoardId = null;
  let currentMovieId = null;
  // update marquee with group data
  const updateMarquee = (groupData) => {
    // Save references to components to update as variables
    const groupName = $("#group-name");
    const currentTheme = $("#current-theme");
    const upcomingMovie = $("#upcoming-movie");
    const showDay = $("#show-day");
    const showTime = $("#show-time");
    const showDate = $("#show-date");
    const timeZone = $("#time-zone");

    timeZone.text(groupData.Boards[0].timeZone);
    groupName.text(groupData.name);
    currentTheme.text(groupData.Boards[0].currentTheme);
    // upcomingMovie.text(groupData.Boards[0].leadingFilm); // not added yet
    showDay.text(moment(groupData.Boards[0].nextShowing).format("dddd") + ",");
    showDate.text(groupData.Boards[0].nextShowing);
    showTime.text(groupData.Boards[0].showTime).toUpperCase();
  };

  // On page load, get info about the current user
  $.get("/api/user_data")
    .then(function(userData) {
      currentUser = userData;
    })
    .then(function() {
      // Get group data
      $.get(`/api/users_groups/${groupId}`).then(function(groupData) {
        adminUserId = groupData.adminUserId;
        // Check if the group is private
        console.log(groupData);
        // save the board ID as a variable for adding movies
        currentBoardId = groupData.Boards[0].id;

        if (groupData.isPrivate) {
          console.log("This is a private group");
          // check if the user belongs to the group
          let userIsInGroup = false;
          for (let i = 0; i < groupData.Users.length; i++) {
            if (groupData.Users[i].id === currentUser.id) {
              userIsInGroup = true;
            }
          }
          if (userIsInGroup) {
            // check if they are the admin
            if (currentUser.id === adminUserId) {
              currentUserIsAdmin = true;
              console.log("This is the admin user");
            }
            // if they are in the group, update the dom with the group data
            updateMarquee(groupData);
          } else {
            window.location.href = "/members";
          }
        } else {
          // check if they are the admin
          if (currentUser.id === adminUserId) {
            currentUserIsAdmin = true;
            console.log("This is the admin user");
          }
          // It's a public group, so load in the rest of the data
          console.log("this is a public group");
          updateMarquee(groupData);
        }
      });
    });

  // listen for movie add
  $("#submit-movie-suggestion").click(function(e) {
    // prevent the page from reloading
    e.preventDefault();
    const movie = $("#movie-input")
      .val()
      .trim();
    const streaming = $("#streaming-input")
      .val()
      .trim();
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // CHECK IF THE MOVIE IS IN THE DB
    $.ajax({
      url: "/api/movie/" + movie,
      method: "GET",
    }).then(function(response) {
      console.log(response);

      // If I get a response, it is already in the DB
      if (response) {
        movieAlreadySaved = true;
        // This response has the movie key
        currentMovieId = response.id;
        console.log("movieAlreadySaved: " + movieAlreadySaved);
        $("#movie-input").val("");
        $("#streaming-input").val("");
        addMovieToBoard(currentMovieId, currentBoardId);
      }

      // If ther response is null, hit IMBD for it
      if (!response) {
        console.log("No record of movie in the DB");
        movieAlreadySaved = false;
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function(response) {
          console.log(response);
          if (response.Error) {
            alert(response.Error);
          }

          // Then Add it to the DB
          let tomatoes = "NA";
          for (var i = 0; i < response.Ratings.length; i++) {
            if (response.Ratings[i].Source === "Rotten Tomatoes") {
              tomatoes = response.Ratings[i].Value;
            }
          }
          const newMovie = {
            genre: response.Genre,
            image: response.Poster,
            imdbRating: response.imdbRating,
            streamingService: streaming,
            synopsis: response.Plot,
            title: movie,
            tomatoes: tomatoes,
            releaseYear: response.Year,
          };

          // Upload the movie to the DB
          $.ajax({
            method: "POST",
            url: "/api/movie",
            data: newMovie,
          }).then((response) => {
            console.log(response);
            currentMovieId = response.id;
            addMovieToBoard(currentMovieId, currentBoardId);
          });

          // Clears all of the text-boxes
          $("#movie-input").val("");
          $("#streaming-input").val("");
          // Alert
          

          alert("Movie successfully added");
        });
      }
    });

    // DO I need this line?
    movieAlreadySaved = false;
  });

  const addMovieToBoard = (movieId, boardId) => {

    $.ajax({
      method: "POST",
      url: "/api/boards_movies",
      data: {
        MovieId: movieId,
        BoardId: boardId
      }
    }).then((response, error) => {
      console.log(response)
      if (error) {console.log(error)}
    });

  };


});
