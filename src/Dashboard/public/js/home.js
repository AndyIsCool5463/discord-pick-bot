function invite() {
  window.location.href =
    "https://discordapp.com/oauth2/authorize?client_id=525901565018767364&scope=bot&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A80%2FtestingDash";
}
var timeGreet = function(user) {
  let f = document.getElementById("welcomeMsg");
  var today = new Date();
  var now = today.getHours();
  var message;

  if (now < 12) {
    message = "Good Morning";
  } else if (now < 18) {
    message = "Good Afternoon";
  } else {
    message = "Good Evening";
  }
  var xd = today.toLocaleTimeString();
  var day = today.toLocaleDateString();
  var timezone = today.getTimezoneOffset();
  return (f.innerHTML = `${message}, ${user}`);
};

function redirect(user, id) {
  window.location.href = `/dashboard/edit/${user}/${id}/manage/config`;
}
