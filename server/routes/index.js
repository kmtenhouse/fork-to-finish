"use strict";

const router = require("express").Router();
const path = require("path");

const apiRoutes = require("./api");
const authRoutes = require("./auth");
const htmlRoutes = require("./html-routes");

//MOUNT ALL MAJOR ROUTES
router.use("/", htmlRoutes);
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

// CATCH ALL
if (process.env.NODE_ENV === 'production') {
    // Handle React routing, return all requests to React app
    router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
    })
  }

module.exports = router;
