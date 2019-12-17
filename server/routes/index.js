"use strict";

const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth");
const htmlRoutes = require("./html-routes");

//MOUNT ALL MAJOR ROUTES
router.use("/", htmlRoutes);
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

// CATCH ALL
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
  }

module.exports = router;
