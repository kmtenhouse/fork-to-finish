"use strict";

const router = require("express").Router();
const colorController = require("../../../controllers/colorController");
const { isAuthenticatedForJSON } = require("../../../middleware/auth/isAuthenticated").isAuthenticatedForJSON;

//MAIN ROUTES
//healthcheck route
router.get("/", colorController.findAll);
router.post("/", /* isAuthenticatedForJSON, */ colorController.create);
router.delete("/:id", /* isAuthenticatedForJSON, */ colorController.delete);

module.exports = router;
