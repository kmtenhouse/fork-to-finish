"use strict";

const router = require("express").Router();
const exampleRoutes = require("./examples");
const WebError = require("../../middleware/WebError");
//const handleErr = require("../../middleware/index").handleErrs;

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  res.send("API ROUTES");
});

router.use("/examples", exampleRoutes);

module.exports = router;
