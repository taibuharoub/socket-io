//this is just the slash(/) end point/namespace
/**
 * example
 * the /admin namespace/endpoint
 * const socket = io("http://localhost:3000/admin");
 */
const socket = io("http://localhost:3000");
const socket2 = io("http://localhost:3000/admin");

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "Data from client" });
});

socket.on("joined", (msg) => {
  console.log(msg);
  console.log("me");
});

// socket2.on("welcome", (msg) => {
//   console.log(msg);
// });

socket2.on("welcome", (dataFromServer) => {
  console.log(dataFromServer);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  //   console.log(event);
  const newMessage = document.querySelector("#user-message").value;
  //   console.log(newMessage);
  socket.emit("newMessageToServer", { text: newMessage });
});
