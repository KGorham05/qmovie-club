const socket = io();
const randomRoomNumber = Math.floor(Math.random() * 2)
const room = `room${randomRoomNumber}`

console.log(randomRoomNumber);

socket.emit("create", room);

$("form").submit(function(e) {
  e.preventDefault(); // prevents page reloading
  socket.emit("chat message", $("#m").val());
  $("#m").val("");
  return false;
});

socket.on("chat message",  function(msg) {
  $("#messages").append($("<li>").text(msg));
});
