"use strict";

const server = require("./server")(),
  database = require("./database")(),
  config = require("./config");

(async function () {
  try {
    await database.connect(config);
    server.create(config);
    server.start();
  } catch(err) {
    throw err;
  }
})();

