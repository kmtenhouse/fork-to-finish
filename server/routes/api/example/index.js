"use strict";

const router = require("express").Router();
const exampleController = require("../../../controllers/exampleController");
const { isAuthenticatedForJSON } = require("../../../middleware/isAuthenticated");

//MAIN ROUTES
//healthcheck route
router.get("/", exampleController.findAll);
router.post("/", isAuthenticatedForJSON, exampleController.create);
router.delete("/:id", isAuthenticatedForJSON, exampleController.delete);

module.exports = router;
