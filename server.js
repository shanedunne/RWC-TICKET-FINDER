var http = require("http");

// server intended to keep the bot running on repl.it
http
  .createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
  })
  .listen(8080);
