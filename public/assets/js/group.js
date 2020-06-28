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

    groupName.text(groupData.name); // working
    currentTheme.text(groupData.Boards[0].currentTheme); //working 
    upcomingMovie.text(groupData.Boards[0].leadingFilm); // cant test yet
    // parse through groupData.Boards[0].nextShowing and split
    // day and time
    // use moment.js to get day from date string

    groupData.Board[0].nextShowing
    // showDay.text();
    // showDate.text();
    // showTime.text();
    
  }
  
  
  
  
  
  
  
  
  
  
  // Get info about the current user
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



    // check if the movie already exists in the movie database
    // if not, create the movie, add a record to the movie table
    // add a reference to the boards_movies table


});
