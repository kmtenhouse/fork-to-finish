"use strict";

const router = require("express").Router();
const exampleController = require("../../../controllers/exampleController");

//MAIN ROUTES
//healthcheck route
router.get("/", exampleController.findAll);

module.exports = router;
