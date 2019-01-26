var g = function() {
  var c = parseInt(document.getElementById("ping").innerHTML);
  var f = document.getElementById("ping");
  console.log(c);
  if (c <= 40) {
    f.style.color = "green";
  }
  if (c >= 41 || c <= 99) {
    f.style.color = "yellow";
  }
  if (c > 100) {
    f.style.color = "red";
  }
};
g();
ping();
fetchtime();
// Init timer
function fetchtime() {
  var e = document.getElementById("special").value;
  console.log("fetched");
  var socket = io.connect(e);
  setInterval(xd, 1000);

  socket.on("returnTime", d => {
    document.getElementById("uptime").innerText = d.time;
  });
  function xd() {
    socket.emit("fetchTime");
  }
}
function ping() {
  console.log("fetchedPing");
  var e = document.getElementById("special").value;
  var socket = io.connect(e);
  setInterval(pinger, 10000);

  socket.on("returnPing", d => {
    document.getElementById("ping").innerText = d.time;
    g();
  });
  function pinger() {
    socket.emit("fetchPing");
  }
}
