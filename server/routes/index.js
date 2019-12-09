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
router.use((req, res) => {
    //If no routes are hit in production, send our React app
    if (process.env.NODE_ENV === "production") {
        return res.sendFile(path.join(__dirname, "../client/build/index.html"));
    }
    //Otherwise, send a 404 (in development)
    res.sendStatus(404);
}
);

module.exports = router;
