"use strict";

const router = require("express").Router();
const passport = require("passport");

//MAIN ROUTES
//healthcheck route
router.get('/',
    passport.authenticate('google', { scope: 'profile' }));

router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        console.log("Logged in");
        res.redirect('/');
    });

module.exports = router;
