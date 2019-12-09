"use strict";

const router = require("express").Router();
const passport = require("passport");

//MAIN ROUTES
//healthcheck route
router.get('/',
    passport.authenticate('google', { scope: 'openid profile' }));

router.get('/callback',
    passport.authenticate('google',
        { failureRedirect: '/auth/failure' }),
    (req, res) => {
        res.redirect('/auth/success');
    });

module.exports = router;
