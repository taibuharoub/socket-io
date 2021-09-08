const path = require("path");
const express = require("express");
const socket = require("socket.io");

const app = express();

let namespaces = require("./data/namespaces");
// console.log(namespaces);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});

const io = socket(server);

//io.on = io.of("/").on()
//main namespace connection
io.on("connection", (socket) => {
  //build an array to send back with the img and enpoint for each NS
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  // console.log(nsData);

  //send the nsData back yo the client. we need to use socket, Not io,
  //coz we want it to go to just this client
  socket.emit("nsList", nsData);
});

//Loop through each namespace and listen for a connection
namespaces.forEach((namespace) => {
  // console.log(namespace);
  io.of(namespace?.endpoint).on("connection", (socket) => {
    console.log(`${socket?.id} has joined ${namespace?.endpoint}`);
  });
});
