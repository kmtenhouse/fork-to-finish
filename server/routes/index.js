"use strict";

const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  console.log(`${req.user ? req.user.email : 'No one'} is logged in!`)
  res.send("Slash route");
});

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;
