const express = require("express");
const passport = require("passport");
const router = express.Router();


router.post("/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "https://google.com"
  })
  
);


module.exports = router;