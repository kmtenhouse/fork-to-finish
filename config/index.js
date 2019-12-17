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
  port: process.env.PORT,
  databaseRef: process.env.MONGODB_URI,
  redisURL: process.env.REDIS_URL
};

const mergedConfigs = Object.assign({}, defaultConfig, envConfig);

module.exports = mergedConfigs;