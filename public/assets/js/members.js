$(document).ready(function() {
  let currentUser = null;
  // Add user's name or email to page
  $.get("/api/user").then(function(data) {
    console.log(data);
    currentUser = data;
    data.email
      ? $("#member-name").text(data.email)
      : $("#member-name").text(`${data.firstName} ${data.lastName}`);
  });

  // initialize the date picker
  $( "#datepicker" ).datepicker();


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
      timeZone: $("#time-zone").val()
    };
    console.log(newGroup);
    $.post("/api/groups", newGroup)
      .then(function(data) {
        console.log(data)
        window.location.replace(`/group/${data.GroupId}`);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
    // Send a post request with the data from the form to the /groups route
  });

  // For the join private group btn
  // For the join public group btn
});
