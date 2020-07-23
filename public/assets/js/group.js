$(document).ready(function() {
  console.log("page loaded");
  // Load the groups info based of the current URL
  const pathname = window.location.pathname;
  const groupId = pathname.split("/")[2];
  let currentUser = null;
  let currentUserIsAdmin = false;
  let adminUserId = null;

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
  }
    
  // On page load, get info about the current user
  $.get("/api/user_data")
    .then(function(userData) {
      currentUser = userData;
    })
    .then(function() {
      // Get group data
      $.get(`/api/users_groups/${groupId}`).then(function(groupData) {
        adminUserId = groupData.adminUserId;
        // Check if the group is privatew
        console.log(groupData);
        if (groupData.isPrivate) {
          console.log('This is a private group');
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
            console.log("This is the admin user")
          }
          // It's a public group, so load in the rest of the data
          console.log("this is a public group");
          updateMarquee(groupData);
        }
      });
    });

    // listen for movie add
    $("#submit-movie-suggestion").click(function (e) {
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
      // IF IT IS, add it to the group/movie board
      // if it is not, call for it with ajax


      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        // handle error
        if (response.Error) {
          alert(response.Error)
        } 


        // Send the relevant data from omdb to firebase along with suggestBy
        // Creates local "temporary" object for holding train data
  
        // Ratings":[{"Source":"Rotten Tomatoes","Value":"82%"}]
        let tomatoes = "NA";
  
        for (var i = 0; i < response.Ratings.length; i++) {
          if (response.Ratings[i].Source === "Rotten Tomatoes") {
            tomatoes = response.Ratings[i].Value;
          }
        }
  
        const newMovie = {
          year: response.Year,
          genre: response.Genre,
          imdbRating: response.imdbRating,
          tomatoes: tomatoes,
          title: movie,
          streaming: streaming,
          image: response.Poster,
          synopsis: response.Plot,
          numVotes: 0
        };
  
        console.log(newMovie)
  
       // Upload the movie to the DB
       
  
        // Clears all of the text-boxes
        $("#movie-input").val("");
        $("#streaming-input").val("");
        // Alert
        alert("Movie successfully added");
      });
    });


    // check if the movie already exists in the movie database
    // if not, create the movie, add a record to the movie table
    // add a reference to the boards_movies table


});
