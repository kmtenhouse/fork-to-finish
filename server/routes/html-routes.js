"use strict";

const router = require("express").Router();

//MAIN ROUTE
router.get("/", (req, res) => {
  res.send("SLASH ROUTE");
});

module.exports = router;
