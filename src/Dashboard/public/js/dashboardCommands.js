var socket = io.connect("http://localhost:8080");

document.getElementById("creater").addEventListener("submit", e => {
  const testArgs = document.getElementById("ff");
  const passedArgs = {
    name: testArgs.value
  };
  socket.emit("commandCreated", passedArgs);
});
