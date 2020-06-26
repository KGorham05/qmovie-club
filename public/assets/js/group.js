$(document).ready(function() {
  console.log("page loaded");
  // Load the groups info based of the current URL
  const pathname = window.location.pathname;
  const groupId = pathname.split("/")[2];
  let currentUser = null;
  let currentUserIsAdmin = false;
  let adminUserId = null;

  // Get info about the current user
  $.get("/api/user_data")
    .then(function(userData) {
      currentUser = userData;
    })
    .then(function() {
      // Get group data
      $.get(`/api/users_groups/${groupId}`).then(function(groupData) {
        console.log(groupData);
        adminUserId = groupData.adminUserId;
        console.log('current user id: ' + currentUser.id)
        console.log('admin id = ' + adminUserId)
        // Check if the group is private
        if (groupData.isPrivate) {
          console.log('This is a private group')
          // check if the user belongs to the group
          let userIsInGroup = false;
          for (let i = 0; i < groupData.Users.length; i++) {
            if (groupData.Users[i].id === currentUser.id) {
              userIsInGroup = true;
            }
          }
          console.log('is user in group: ' + userIsInGroup)
          if (userIsInGroup) {
            // check if they are the admin
            if (currentUser.id === adminUserId) {
              currentUserIsAdmin = true;
            }
            // if they are in the group, update the dom with the group data
            // TODO finish this
          } else {
            // if not, kick them back to the members route
            window.location.href = "/members";
          }
        } else {
          // It's a public group, so load in the rest of the data
          console.log("this is a public group")
        }
      });
    });

  // listen for movie add
  // check if the movie already exists in the movie database
  // if not, create the movie, add a record to the movie table
  // add a reference to the boards_movies table
});
