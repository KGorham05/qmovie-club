// On page load
$(document).ready(function() {

  // Initialize global variables
    
  // Get info about the current user, current group, active users, it's associated active board, that board's movies
  // Once all the group data is loaded in...

    // Update the Marquee
    
    // Display the movies on the board
    
    // Display the scoreboard/numVotes

    // If the current user is the admin
      // Allow them to invite users
      // Allow them to update the current showtime/date
      // Allow them to update the current theme
      // Allow them to access "Prep for next showing"
  
  // Listen for movie suggestions
    // Check the DB for an existing movie record
      // if found, associate it with this board in the DB
      // else, query the API for movie data
        // then, associate it with this board in the DB
      // Once it's associated with the board in the DB, add it to the view
  
  // Listen for Votes
    // update the numVotes in the DB
    // check if it is now the leading film
      // if so, update the leadingFilm in the DB
      // update the marquee's upcoming film display
    // Update the scoreboard display
})