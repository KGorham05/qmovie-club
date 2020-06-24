$(document).ready(function () {

  const currentUser = null; 
  // Add user's name or email to page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    currentUser = data;
    data.email
      ? $("#member-name").text(data.email)
      : $("#member-name").text(`${data.firstName} ${data.lastName}`);
      console.log(currentUser);
  });

  
  
  
  // Event Listeners

  // Open the create group modal
  $("#open-create-group-modal").click(() => {
    $("#createGroupModal").modal('show');
  })

  // Create a group
  $("#create-group-btn").click(() => {
    console.log('Time to create a group!')
    // Create an object with data from the form
    const newGroup = {
      name: $("#group-name").val(),
      description: $("#message-text").val(),
      isPrivate: $('input[name=is-private]:checked').val()
    }
    console.log(newGroup);
    // Send a post request with the data from the form to the /groups route
  })


  // For the join private group btn
  // For the join public group btn




});
