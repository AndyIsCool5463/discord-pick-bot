var a = [
  "cGluZw==",
  "aW5uZXJIVE1M",
  "c3R5bGU=",
  "Y29sb3I=",
  "Z3JlZW4=",
  "eWVsbG93",
  "Z2V0RWxlbWVudEJ5SWQ="
];
(function(c, d) {
  var e = function(f) {
    while (--f) {
      c["push"](c["shift"]());
    }
  };
  e(++d);
})(a, 0xd8);
var b = function(c, d) {
  c = c - 0x0;
  var e = a[c];
  if (b["KFAvvJ"] === undefined) {
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
    b["ihTfVV"] = function(r) {
      var s = atob(r);
      var t = [];
      for (var u = 0x0, v = s["length"]; u < v; u++) {
        t += "%" + ("00" + s["charCodeAt"](u)["toString"](0x10))["slice"](-0x2);
      }
      return decodeURIComponent(t);
    };
    b["QqTmKX"] = {};
    b["KFAvvJ"] = !![];
  }
  var w = b["QqTmKX"][c];
  if (w === undefined) {
    e = b["ihTfVV"](e);
    b["QqTmKX"][c] = e;
  } else {
    e = w;
  }
  return e;
};
var g = function() {
  var c = document[b("0x0")](b("0x1"));
  let d = parseInt(c[b("0x2")]);
  if (d <= 0x1e) {
    c[b("0x3")][b("0x4")] = b("0x5");
  } else if (d >= 0x1f && d <= 0x64) {
    c[b("0x3")][b("0x4")] = b("0x6");
  } else c[b("0x3")][b("0x4")] = "red";
};
g();
