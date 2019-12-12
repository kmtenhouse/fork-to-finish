"use strict";

const fs = require("fs"),
    path = require("path");

const indexFile = path.basename(module.filename);
const User = require("../../database/services/userService");

module.exports = function () {
    const passport = require("passport");

    const initialize = function (config) {
        try {
            fs
                .readdirSync(__dirname)
                .filter(function (file) {
                    return (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js');
                })
                .forEach(function (file) {
                    const fullPath = path.join(__dirname, file);
                    const currentStrategy = require(fullPath)(config);
                    passport.use(currentStrategy);
                });
        }
        catch (err) {
            throw err;
        }

        // Set up our serialization options for passport
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(async function (id, done) {
            try {
                const currentUser = await User.findById(id);
                done(null, currentUser);
            } catch (err) {
                done(err, false);
            }
        });

        return passport;
    }

    return { initialize };
}

