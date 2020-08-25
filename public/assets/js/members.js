$(document).ready(function() {
  let currentUser = null;
  let haveQueriedPublicGroups = false;
  // initialize the date picker
  $("#datepicker").datepicker();

  function populateGroupsTable(groupsData, groupName) {
    if (groupsData.length > 0) {
      $(`.${groupName}`).show();
    }
    // loop over each group the user belogs to
    groupsData.forEach((group) => {
      console.log(group);
      // create html elements for the table row
      // add the text from the data to the html elements
      const tr = $("<tr>");
      const gName = $("<td>").text(group.name);
      const gDescrip = $("<td>").text(group.description);
      // create a button (link) to that group's page
      const gLink = $(
        `<td class='view-board-link'><a href='/group/${group.id}'>View Board</a></td>`
      );
      tr.append([gName, gDescrip, gLink]);
      $(`#${groupName}-table-body`).append(tr);
    });
    // append the elements to the row
    // append the row to the page
  }

  function joinPublicGroupById(id) {
    // POST request to a route in the groups controller
    // set up a method in the controller to handle adding users to a public group
    console.log("Now we need to add this user to this group");
    // when they are successfully added, open that group's page
  }

  // Load User's data on page load
  $.get("/api/users/groups").then(function(dbUser) {
    currentUser = dbUser;
    // Add user's name or email to page
    dbUser.email
      ? $("#member-name").text(dbUser.email)
      : $("#member-name").text(`${dbUser.firstName} ${dbUser.lastName}`);

    // if the user doesn't belong to any groups, hide the Your groups section
    if (dbUser.Groups.length === 0) {
      $(".my-groups").hide();
    }
    populateGroupsTable(dbUser.Groups, "my-groups");
  });

  // Event Listeners
  // Open the create group modal
  $("#open-create-group-modal").click(() => {
    $("#createGroupModal").modal("show");
  });

  // Open the browse publig groups modal
  $("#open-public-groups-modal").click(() => {

    // if this is the first time we've clicked this button...
    if (!haveQueriedPublicGroups) {
      // flip flag so next time we don't query the DB again
      haveQueriedPublicGroups = true;
      // ping the API to get the list of public groups
      $.get(`/api/groups`).then(function(groupsData) {
        // build the table
        populateGroupsTable(groupsData, "public-groups");
      });
    }

    // Append them to the modal

    // show the modal
    $("#joinPublicGroupModal").modal("show");
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
