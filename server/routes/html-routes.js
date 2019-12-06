"use strict";

const router = require("express").Router();
const path = require("path");
const isAuthenticatedForWeb = require("../middleware/isAuthenticated").isAuthenticatedForWeb;

//MAIN ROUTE
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

//RESTRICTED ROUTES
//Only available if a member has logged in!
router.get("/members", isAuthenticatedForWeb, (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/private/members.html"));
})

module.exports = router;
