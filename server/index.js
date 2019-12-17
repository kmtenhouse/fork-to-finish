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
  redis = require("redis"),
  path = require("path");

module.exports = function () {
  let app = express(),
    server,
    create,
    start;

  const auth = require("./auth/")();

  create = function (config) {

    if (!config.redisURL) {
      throw new Error(`Invalid redis url provided! ${config.redisURL}`);
    }

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
        scriptSrc: ["'self'", 'forktofinish.herokuapp.com', "'unsafe-inline"],   // define valid sources for script files 
        frameAncestors: ["'none'"],  // helps prevent Clickjacking attacks
        imgSrc: ["'self'", 'forktofinish.herokuapp.com'], // define valid souces of images
        styleSrc: ["'self'", 'forktofinish.herokuapp.com', "'unsafe-inline'", 'fonts.googleapis.com', 'fonts.gstatic.com'], // define valid sources for stylesheets 
        fontSrc: ['fonts.googleapis.com', 'fonts.gstatic.com'] //define valid sources for fonts (example shown: Google Fonts)
      }
    }));

    //(IN PRODUCTION ONLY)
    // Serve any static files
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
    } 

    // SESSION STORAGE SETUP
    //-------------------------------------------------------
    // Set up your session store below
    // (This version uses Redis - other options can be viewed at: https://github.com/expressjs/session#compatible-session-stores )
    const RedisStore = require("connect-redis")(session);
    const redisClient = redis.createClient(config.redisURL);
    const sessionStore = new RedisStore({ client: redisClient });
    //-------------------------------------------------------

    const sessionConfig = {
      store: sessionStore,
      secret: config.cookie_secret,
      resave: false,
      saveUninitialized: true,
      cookie: {},
      name: "id" //make session cookie name generic so it's harder to tell what tech we are using
    };

    //In production, ensure we are using secure cookies for our session!
    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      sessionConfig.cookie.secure = true;  // serve secure cookies
      sessionConfig.cookie.httpOnly = true; // ensure front end js cannot touch cookie 
    }

    app.use(session(sessionConfig));

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

    // Error handling middleware for issues with serialization / deserialization  
    // (Edge case: if the session db goes down and we can't look up the user from their session cookie)
    app.use(async (err, req, res, next) => {
      if ((/logout/.test(req.url))) { // If the user is annoyed and trying to log out, let them do it!
        req.logout();  // Clean up by removing the session info so that they don't keep getting serialization / deserialization checks
        await req.session.destroy();
      }
      next(err); // Otherwise, proceed to display our regular error page
    });

    // Set up routes
    // ====== Routing ======
    const routes = require("./routes");
    app.use(routes);

    // Lastly, here's where we import any custom error handlers:
    const errorHandlers = require("./middleware/errorhandlers");
    for (let fn of errorHandlers) {
      app.use(fn);
    }

    // Final, catch-all error handler
    app.use((err, req, res, next) => {
      // (To-do) Log the error itself      
      console.log(err.message);
      res.sendStatus(500);
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
