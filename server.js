const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("join-room", (obj) => {
    socket.join(obj.roomId);
    console.log("room created with this room name ", obj);
    io.to(obj.roomId).emit("in-room-chat", "I joined this room");
    socket.emit("joined-room", "you joined this room");
  });
  socket.on("chat", (msg) => {
    console.log(msg);
    socket.emit("chat", "msg received");
  });
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.render("index", { id: "Your Identity" });
});
server.listen(3000, () => {
  console.log("server is running on port 3000");
});
