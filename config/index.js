"use strict";

const env = process.env.NODE_ENV || "development",
  envConfig = require("./" + env);

const defaultConfig = {
  env: env,
  hostname: "localhost",
  port: 4000,
};

const mergedConfigs = Object.assign({}, defaultConfig, envConfig);

module.exports = mergedConfigs;