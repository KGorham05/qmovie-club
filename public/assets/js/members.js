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

  function displayPrivateGroupPassword() {
    $("#private-key-form-group").css("display", "block")
  }

  function hidePrivateGroupPassword() {
    $("#private-key-form-group").css("display", "none")
  }

  function validateGroupForm(formData) {
    // check for...
    // Group Name
    if (!formData.name) {
      alert("Group name is a required field!")
      return false;
    } 
    // Group Description
    else if (!formData.description) {
      alert("Description is a required field!")
      return false;
    } 
    // Date    
    else if (!formData.nextShowing) {
      alert("Date of first showing is a required field!")
      return false;
    } 
    // Showtime    
    else if (!formData.showTime) {
      alert("Showtime is a required field!")
      return false;
    } 
    // Timezone    
    else if (!formData.timeZone) {     
      alert("Timezone is a required field!")
      return false;
    } 
    // Make sure the at least 1 radio button is selected
    else if (!$('input[name="is-private"]:checked').length) {
      alert("You must select private or public group!")
      return false;
    }
    // If the group is private
    else if (formData.isPrivate === "true") {
      console.log(formData.isPrivate)
      // Validate they added a password
      if (!formData.password) {
        alert("A password is required to create a private group!");
        return false;
      } 
    }
    return true;
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
      name: $("#group-name").val().trim(),
      description: $("#group-description").val().trim(),
      isPrivate: $("input[name=is-private]:checked").val(),
      password: $("#private-group-key").val().trim(),
      adminUserId: currentUser.id,
      nextShowing: $("#datepicker").val(),
      firstTheme: $("#theme").val().trim(),
      showTime: $("#show-time").val().trim(),
      timeZone: $("#time-zone").val().trim(),
    };
    console.log(newGroup);

    // Validate the group has all required data before firing post request
    if(validateGroupForm(newGroup)) {
      console.log("All required data has been entered")
    } else {
      console.log("Missing a required input")
      return;
    };
     
    // NEED TO UPDATE THIS ROUTE'S MODEL SO GROUP PASSWORD GETS SAVED IN THE DB
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

  // If Private Group is selected, display the password input field
  $("input[name='is-private'").change(() =>{
    // If it is a private group
    if ($("#is-private").is(":checked")) {
      // display the password field
      displayPrivateGroupPassword()
    } else {
      // hide the password field
      hidePrivateGroupPassword()
    }
  });

  // On page load, hide the password field unless it's clicked
  hidePrivateGroupPassword();
});

// get request for all public groups (do this only on click to speed up page load)
// populate publig group list
