const socket = io("http://localhost:3000");

console.log(socket);
socket.on("connect", () => {
  console.log(socket?.id);
});

//listen for nslist, which is a list of all namespaces
socket.on("nsList", (nsData) => {
  console.log("The list of namespace has arrived");
  // console.log(nsData);
  let namespacesDiv = document.querySelector(".namespaces");
  //will first reset it
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" /></div>`;
  });

  //add a clicklistener for each NS
  //Will convert the nodelist into a real array using the Array.from()
  //method
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    // console.log(elem);
    elem.addEventListener("click", (e) => {
      // console.log(e.target);
      const nsEndpoint = elem.getAttribute("ns");
      console.log(`${nsEndpoint} I should go to now`);
    });
  });
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "Data from client" });
});

socket.on("joined", (msg) => {
  console.log(msg);
  console.log("me");
});

// document.querySelector("#message-form").addEventListener("submit", (event) => {
//   event.preventDefault();
//   //   console.log(event);
//   const newMessage = document.querySelector("#user-message").value;
//   //   console.log(newMessage);
//   socket.emit("newMessageToServer", { text: newMessage });
// });
