"use strict";

const router = require("express").Router();

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
    res.send("API ROUTES");
  });

module.exports = router;
