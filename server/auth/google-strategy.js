"use strict";
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../services/userService");

module.exports = function (config) {
  if (!config.google_client_id || !config.google_client_secret) {
    throw new Error("Must provide client id and secret for Google!");
  }

  const strategy = new GoogleStrategy({
    clientID: config.google_client_id,
    clientSecret: config.google_client_secret,
    callbackURL: "/auth/google/callback"
  },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const currentUser = await User.findOrCreateViaGoogleId({ googleId: profile.id });
        if(!currentUser) {
          done(null, false); //if we somehow didn't manage to find or create a user, call done with 'false' as an argument in place of user data
        }
        done(null, currentUser);
      }
      catch(err) {
        //log error here
        done(err);
      }
    }
  );

  return strategy;
}