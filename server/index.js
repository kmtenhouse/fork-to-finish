"use strict";

const http = require("http"),
  express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  /*   cors = require("cors"), */
  xssFilter = require('x-xss-protection'),
  helmet = require("helmet");

module.exports = function () {
  let app = express(),
    server,
    create,
    start;

  create = function (config) {
    let routes = require("./routes");

    // Settings
    app.set("env", config.env);
    app.set("port", config.port);
    app.set("hostname", config.hostname);
    app.set("staticDir", config.staticDir);
   
    // Set up helmet middleware

    // Ensure we only access the application via https in production:
    if (app.get("env") === "production") {
      app.use(helmet.hsts());
    }

    // Prevent the app from being loaded in iframes (for certain browsers)
    app.use(helmet.frameguard());

    // Help browsers prevent page load on reflected xss attacks
    app.use(xssFilter());

    // Returns middleware that parses json
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());

    //Logging (for dev)
    app.use(morgan("dev"));

    // Set up CORS here
    //app.use(cors());

    // Set up routes
    // ====== Routing ======
    app.use(routes);

    // Create a separate server for our app
    server = http.createServer(app);
  };

  // Method that starts the http server itself:
  start = function () {
    const hostname = app.get("hostname");
    const PORT = app.get("port");

    server.listen(PORT, function () {
      console.log(`App listening on https://${hostname}:${PORT}`);
    });
  };

  return {
    create: create,
    start: start
  };
};
