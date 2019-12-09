"use strict";

const router = require("express").Router();
const exampleRoutes = require("./example");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  res.send("API ROUTES");
});

router.use("/example", exampleRoutes);

module.exports = router;
