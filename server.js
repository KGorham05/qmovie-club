if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
// const morgan = require("morgan");
const session = require("express-session");
const passport = require("./config/passport");
const routes = require("./routes");
const db = require("./models");
const PORT = process.env.PORT || 8080;
const app = express();
const forceSync = false;
const server = require("http").createServer(app);

const io = require("socket.io")(server);

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });

// });

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("create", function(room) {
    console.log(`Joined room: ${room}`)
    socket.join(room);

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.to(room).emit('chat message', msg);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

  });
});

app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: forceSync }).then(function() {
  server.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
