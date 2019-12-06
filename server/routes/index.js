"use strict";

const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth");
const htmlRoutes = require("./html-routes");

//MOUNT ALL MAJOR ROUTES
router.use("/", htmlRoutes);
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;
