"use strict";

const router = require("express").Router();
const colorRoutes = require("./color");

router.use("/color", colorRoutes);

module.exports = router;
