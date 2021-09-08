const path = require("path");
const express = require("express");
const socket = require("socket.io");

const app = express();

let namespaces = require("./data/namespaces");
console.log(namespaces);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});

const io = socket(server);
//io.on = io.of("/").on()
io.on("connection", (socket) => {
  socket.emit("messageFromServer", {
    data: "Welocome to the socket.IO Server",
  });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
  //join level1 room
  socket.join("level1");
  io.of("/")
    .to("level1")
    .emit("joined", `${socket.id} says, I have joined the level 1 room`);
});

io.of("/admin").on("connection", (socket) => {
  console.log("Someone connected to the admin channel");
  io.of("/admin").emit("welcome", "Welcome to the Admin channel");
  //   socket.join("level2");
  //   io.of("/admin").to("level2").emit("welcome", "welocme to admin room");
});
