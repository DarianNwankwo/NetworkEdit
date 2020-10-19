const express = require("express");
const passport = require("passport");
const router = express.Router();


// router.post("/register", (req, res) => {
//   passport.authenticate("local-register", {
//     failureRedirect: `${process.env.CLIENT}/register`,
//     failureMessage: "Passwords did not match"
//   });
//   res.status(200).json({ success: true });
// });
router.post(
  "/register",
  passport.authenticate("local-register"),
  (req, res) => {
    res.sendStatus(200);
  }
);


router.post(
  "/login",
  passport.authenticate("local-login"),
  (req, res) => {
    res.sendStatus(200);
  }
);


router.post(
  "/logout",
  (req, res) => {
    req.logOut();
});

module.exports = router;