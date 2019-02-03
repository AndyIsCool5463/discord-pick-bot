var g = function() {
  var c = parseInt(document.getElementById("ping").innerHTML);
  var f = document.getElementById("ping");
  console.log(c);
  if (c <= 60) {
    console.log("SHOULD BE GREEN");
    f.style.color = "green";
  } else if (c >= 62 && c <= 99) {
    console.log("SHOULD BE YELLOW");
    return (f.style.color = "yellow");
  } else {
    console.log("SHOULD BE RED");
    return (f.style.color = "red");
  }
};

// Init timer
function fetchtime() {
  var e = document.getElementById("special").value;
  console.log("fetched");
  var socket = io.connect(e);
  function xd() {
    socket.emit("fetchTime");
  }
  setInterval(xd, 1000);

  socket.on("returnTime", d => {
    document.getElementById("uptime").innerText = d.time;
  });
}
function ping() {
  console.log("fetchedPing");
  var e = document.getElementById("special").value;
  var socket = io.connect(e);
  function pinger() {
    socket.emit("fetchPing");
  }
  setInterval(pinger, 10000);

  socket.on("returnPing", d => {
    document.getElementById("ping").innerText = d.time;
    g();
  });
}
g();
ping();
fetchtime();
