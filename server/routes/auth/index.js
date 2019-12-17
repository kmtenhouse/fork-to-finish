"use strict";

const router = require("express").Router();
const googleRoutes = require("./google");

//MAIN ROUTES
router.get("/logout", async (req, res) => {
  req.logout();
  await req.session.destroy();
  res.redirect("/");
});

router.get("/whoami", (req, res) => {
  if (req.user) {
    return res.json({ loggedIn: true });
  }
  res.json({ loggedIn: false });
})

router.use("/google", googleRoutes);

module.exports = router;
