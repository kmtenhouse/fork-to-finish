"use strict";

const router = require("express").Router();
const googleRoutes = require("./google");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  res.send("AUTH ROUTES");
});

router.get("/logout", async (req, res) => {
  req.logout();
  await req.session.destroy();
  if(process.env.NODE_ENV === "production") {
    //if we're in prod, route back to the build version of our app
    return res.sendFile(path.join(__dirname, "../client/build/index.html"));
  } 
  //otherwise, route to the client app on localhost
  res.redirect("http://localhost:3000");
});

router.get("/whoami", (req, res) => {
  if(req.user) {
    return res.json({ loggedIn: true });
  }
  res.json({ loggedIn: false });
})

router.get("/success", (req, res) => {
  if(process.env.NODE_ENV === "production") {
    //if we're in prod, route back to the build version of our app
    return res.sendFile(path.join(__dirname, "../client/build/index.html"));
  } 
  //otherwise, route to the client app on localhost
  res.redirect("http://localhost:3000");
});

router.get("/failure", (req, res) => {
  res.sendStatus(401);
});

router.use("/google", googleRoutes);

module.exports = router;
