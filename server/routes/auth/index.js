"use strict";

const router = require("express").Router();
const googleRoutes = require("./google");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  res.send("AUTH ROUTES");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use("/google", googleRoutes);

module.exports = router;
