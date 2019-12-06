"use strict";

const http = require("http"),
  express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  csp = require("helmet-csp"),
  session = require("express-session"),
  toobusy = require("toobusy-js"),
  helmet = require("helmet"),
  hpp = require("hpp"),
  rawBody = require("raw-body"),
  path = require("path");

const AuthenticationError = require("./middleware/AuthenticationError");

module.exports = function () {
  let app = express(),
    server,
    create,
    start;

  const auth = require("./auth/")();

  create = function (config) {
    let routes = require("./routes");

    // Settings
    app.set("env", config.env);
    app.set("port", config.port);
    app.set("hostname", config.hostname);

    // Set up helmet middleware
    // Ensure we only access the application via https in production:
    if (app.get("env") === "production") {
      app.use(helmet.hsts());
    }

    // Prevent the app from being loaded in iframes (for clickjacking)
    app.use(helmet.frameguard());

    // Prevent browser from changing MIME types specified in Content-Type header
    app.use(helmet.noSniff());

    // Help browsers prevent page load on reflected xss attacks
    app.use(helmet.xssFilter());

    // Sets "X-Download-Options: noopen".
    app.use(helmet.ieNoOpen());

    // Sets "X-DNS-Prefetch-Control: off".
    app.use(helmet.dnsPrefetchControl());

    // Don't advertise what framework we are using
    app.disable('x-powered-by');

    // Set up content-security-policy
    // For more information: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
    app.use(csp({
      directives: {
        defaultSrc: ["'self'"],  // default value for all directives that are absent
        scriptSrc: ["'self'", 'cdnjs.cloudflare.com', 'code.jquery.com'],   // helps prevent XSS attacks
        frameAncestors: ["'none'"],  // helps prevent Clickjacking attacks
        imgSrc: ["'self'"],
        styleSrc: ["'self'", 'cdnjs.cloudflare.com', 'fonts.googleapis.com'],
        fontSrc: ['fonts.googleapis.com', 'fonts.gstatic.com']
      }
    }));

    // Set up static dir (if applicable) 
    if (config.staticDir) {
      app.use(express.static(config.staticDir));
    }

    const sess = session(
      {
        secret: config.cookie_secret,
        resave: false,
        saveUninitialized: true
      }
    );

    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      sess.cookie = { secure: true };  // serve secure cookies
    }

    app.use(sess);

    // Set request size limits
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false, limit: "1kb" }))
    // parse application/json
    app.use(bodyParser.json({ limit: "1kb" }))

    // Avoid parameter pollution attacks
    app.use(hpp());

    //Logging (for dev)
    app.use(morgan("dev"));

    // Set up auth strategies
    const passport = auth.initialize(config);
    app.use(passport.initialize());
    app.use(passport.session());

    // Middleware to check if the server is too busy before continuing with request
    app.use((req, res, next) => {
      if (toobusy()) {
        return res.sendStatus(503);
      } else {
        next();
      }
    });

    // Error handling middleware for auth issues (serialization / deserialization)
     app.use((err, req, res, next) => {
      req.logout();  // Ensure we clean up by logging folks out first so that deserialization won't keep failing
      res.sendFile(path.join(__dirname, "../client/public/error.html")); // Dump the user to a verbose error page
    }); 

    // Set up routes
    // ====== Routing ======
    app.use(routes);

    // Catch-all 404
    app.use("*", (req, res) => { res.sendStatus(404) });

    // Lastly, here's a catch-all for any errors in routes that might have slipped by without us noticing 
    app.use((err, req, res, next) => {
      // (To-do) Log the error itself
      console.log(err);

      if (err.redirectTo) {
        res.redirect(err.redirectTo);
      } else {
        res.sendFile(path.join(__dirname, "../client/public/error.html"));
      }
    });

    // Create a separate server for our app
    server = http.createServer(app);
  };

  // Method that starts the http server itself:
  start = function () {
    const hostname = app.get("hostname");
    const PORT = app.get("port");

    server.listen(PORT, function () {
      console.log(`App listening on ${hostname}:${PORT}`);
    });
  };

  return {
    create: create,
    start: start
  };
};
