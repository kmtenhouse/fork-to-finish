"use strict";

const exampleConfig = {
  hostname: "localhost", 
  port: 4000, // port you prefer (default is 4000)
  databaseRef: "mongodb://localhost/exampledb",
  google_client_id: "your google client id goes here",
  google_client_secret: "your google client secret goes here",
  cookie_secret: "a custom secret goes here"
};

module.exports = exampleConfig;