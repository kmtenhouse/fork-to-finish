"use strict";
module.exports = {
    //this function promisifies an existing express function so that any unhandled errors within will be automagically passed to next()
    //this will ensure that any unexpected errors flow through to 
    isAuthenticatedForWeb: function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        next();
    },
    isAuthenticatedForJSON: function(req, res, next) {
        if(!req.user) {
            return res.sendStatus(403);
        }
        next();
    }
};