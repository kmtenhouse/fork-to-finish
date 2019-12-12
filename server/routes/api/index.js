"use strict";

const router = require("express").Router();
const colorRoutes = require("./color");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  res.send("API ROUTES");
});

router.use("/color", colorRoutes);

module.exports = router;
