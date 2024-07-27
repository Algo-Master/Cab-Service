// Setting up Express
const express = require("express");
const path = require("path");
const app = express();

// Setting up SocketIO
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// WebSocket Connection handling
io.on("connection", (socket) => {
  console.log(`New user with id ${socket.id} Connected!!`);
  
  socket.on("user_location", (data) => {
    io.emit("current_location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user_disconnected", socket.id);
  });
});

// Express Handling HTTP Requests
app.get("/", (req, res) => {
  res.render("index");
});

server.listen(5000, () => {
  console.log("Server is running on port: 5000!!");
});
