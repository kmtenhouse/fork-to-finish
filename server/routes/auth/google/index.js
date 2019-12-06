"use strict";

const router = require("express").Router();
const passport = require("passport");

//MAIN ROUTES
//healthcheck route
router.get('/',
    passport.authenticate('google', { scope: 'openid profile' }));

router.get('/callback',
    passport.authenticate('google',
        { failureRedirect: '/failure.html' }),
    (req, res) => {
        res.redirect('/success.html');
    });

module.exports = router;
