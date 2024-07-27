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
app.set(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

server.listen(5000, () => {
    console.log("Server is running on port: 5000!!");
});