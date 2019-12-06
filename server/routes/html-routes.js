"use strict";

const router = require("express").Router();
const path = require("path");

//MAIN ROUTE
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"))
});

module.exports = router;
