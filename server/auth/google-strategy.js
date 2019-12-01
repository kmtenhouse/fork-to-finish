const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function (config) {
  if (!config.google_client_id || !config.google_client_secret) {
    throw new Error("Must provide client id and secret for Google!");
  }

  const strategy = new GoogleStrategy({
    clientID: config.google_client_id,
    clientSecret: config.google_client_secret,
    callbackURL: "/auth/google/callback"
  },
    function (accessToken, refreshToken, profile, done) {
      return (done(err, { id: 1 }));
      /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      }); */
    }
  );

  return strategy;
}