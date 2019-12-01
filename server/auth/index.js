"use strict";

const fs = require("fs"),
    path = require("path");

const indexFile = path.basename(module.filename);


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
        catch(err) {
            err.message = "Auth initialization failed! " + err.message;
            throw err;
        }

        return passport;
    }

    return { initialize };
}

