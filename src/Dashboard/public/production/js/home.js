var a = [
  "R29vZCBNb3JuaW5n",
  "R29vZCBBZnRlcm5vb24=",
  "R29vZCBFdmVuaW5n",
  "dG9Mb2NhbGVUaW1lU3RyaW5n",
  "dG9Mb2NhbGVEYXRlU3RyaW5n",
  "aW5uZXJIVE1M",
  "bG9jYXRpb24=",
  "L2Rhc2hib2FyZC9lZGl0Lw==",
  "L21hbmFnZS9jb25maWc=",
  "aHJlZg==",
  "aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9vYXV0aDIvYXV0aG9yaXplP2NsaWVudF9pZD01MjU5MDE1NjUwMTg3NjczNjQmc2NvcGU9Ym90JnBlcm1pc3Npb25zPTgmcmVkaXJlY3RfdXJpPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0E4MCUyRnRlc3RpbmdEYXNo"
];
(function(c, d) {
  var e = function(f) {
    while (--f) {
      c["push"](c["shift"]());
    }
  };
  e(++d);
})(a, 0xe5);
var b = function(c, d) {
  c = c - 0x0;
  var e = a[c];
  if (b["HhJzDD"] === undefined) {
    (function() {
      var f = function() {
        var g;
        try {
          g = Function(
            "return\x20(function()\x20" +
              "{}.constructor(\x22return\x20this\x22)(\x20)" +
              ");"
          )();
        } catch (h) {
          g = window;
        }
        return g;
      };
      var i = f();
      var j =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      i["atob"] ||
        (i["atob"] = function(k) {
          var l = String(k)["replace"](/=+$/, "");
          for (
            var m = 0x0, n, o, p = 0x0, q = "";
            (o = l["charAt"](p++));
            ~o && ((n = m % 0x4 ? n * 0x40 + o : o), m++ % 0x4)
              ? (q += String["fromCharCode"](0xff & (n >> ((-0x2 * m) & 0x6))))
              : 0x0
          ) {
            o = j["indexOf"](o);
          }
          return q;
        });
    })();
    b["EOvoGb"] = function(r) {
      var s = atob(r);
      var t = [];
      for (var u = 0x0, v = s["length"]; u < v; u++) {
        t += "%" + ("00" + s["charCodeAt"](u)["toString"](0x10))["slice"](-0x2);
      }
      return decodeURIComponent(t);
    };
    b["xCqtnL"] = {};
    b["HhJzDD"] = !![];
  }
  var w = b["xCqtnL"][c];
  if (w === undefined) {
    e = b["EOvoGb"](e);
    b["xCqtnL"][c] = e;
  } else {
    e = w;
  }
  return e;
};
function invite() {
  window["location"][b("0x0")] = b("0x1");
}
var timeGreet = function(c) {
  let d = document["getElementById"]("welcomeMsg");
  var e = new Date();
  var f = e["getHours"]();
  var g;
  if (f < 0xc) {
    g = b("0x2");
  } else if (f < 0x12) {
    g = b("0x3");
  } else {
    g = b("0x4");
  }
  var h = e[b("0x5")]();
  var i = e[b("0x6")]();
  var j = e["getTimezoneOffset"]();
  return (d[b("0x7")] = g + ",\x20" + c);
};
function redirect(k, l) {
  window[b("0x8")][b("0x0")] = b("0x9") + k + "/" + l + b("0xa");
}
