$(document).ready(function() {
  let currentUser = null;
  // initialize the date picker
  $("#datepicker").datepicker();

  function fillYourGroupsTable (groupsData) {
    groupsData.forEach(group => {
      
    })
    // loop over each group the user belogs to
    // create html elements for the table row
    // add the text from the data to the html elements
    // create a button (link) to that group's page
    // append the elements to the row
    // append the row to the page
  }

  // Load User's data on page load
  $.get("/api/users/groups").then(function(dbUser) {
    currentUser = dbUser;
    // Add user's name or email to page
    dbUser.email
      ? $("#member-name").text(dbUser.email)
      : $("#member-name").text(`${dbUser.firstName} ${dbUser.lastName}`);

    fillYourGroupsTable(dbUser.Groups);
  });

  // Event Listeners
  // Open the create group modal
  $("#open-create-group-modal").click(() => {
    $("#createGroupModal").modal("show");
  });

  // Create a group
  $("#create-group-btn").click(() => {
    // Create an object with data from the form
    const newGroup = {
      name: $("#group-name").val(),
      description: $("#group-description").val(),
      isPrivate: $("input[name=is-private]:checked").val(),
      adminUserId: currentUser.id,
      nextShowing: $("#datepicker").val(),
      firstTheme: $("#theme").val(),
      showTime: $("#show-time").val(),
      timeZone: $("#time-zone").val(),
    };
    console.log(newGroup);
    $.post("/api/groups", newGroup)
      .then(function(data) {
        console.log(data);
        window.location.replace(`/group/${data.GroupId}`);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch((err) => {
        console.log(err);
      });
    // Send a post request with the data from the form to the /groups route
  });

});





// get request for all public groups (do this only on click to speed up page load)
// populate publig group list
