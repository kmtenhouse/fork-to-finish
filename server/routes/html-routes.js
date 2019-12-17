"use strict";

const router = require("express").Router();

//MAIN ROUTE
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
});

module.exports = router;
