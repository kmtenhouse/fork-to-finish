"use strict";

const env = process.env.NODE_ENV || "development";
let envConfig = {};
try {
  envConfig = require("./" + env);
} catch(err) {
  console.log("No custom environment configs found; using defaults only");
}

const defaultConfig = {
  env: env,
  hostname: "localhost",
  port: 4000,
  databaseRef: "mongodb://localhost/exampledb"
};

const mergedConfigs = Object.assign({}, defaultConfig, envConfig);

module.exports = mergedConfigs;