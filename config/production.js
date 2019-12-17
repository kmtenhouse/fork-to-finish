"use strict";

const productionConfig = {
  hostname: "heroku", 
  port: process.env.PORT,
  databaseRef: process.env.MONGODB_URI,
  redisURL: process.env.REDIS_URL,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET
};

module.exports = productionConfig;