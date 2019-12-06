"use strict";

const router = require("express").Router();
const passport = require("passport");

//MAIN ROUTES
//healthcheck route
router.get('/',
    passport.authenticate('google', { scope: 'openid profile' }));

router.get('/callback',
    passport.authenticate('google',
        { failureRedirect: '/error' }),
    (req, res) => {
        res.redirect('/members');
    });

module.exports = router;
