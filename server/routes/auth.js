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
router.post("/register", (req, res, next) => {
  passport.authenticate("local-register", (err, user, info) => {
    if (err) { throw err; }
    if (!user) { res.send("No user exists"); }
    else {
      req.logIn(user, (err) => {
        if (err) { throw err; }
        res.send("Successfully Authenticated");
        console.log(req.user);
      })
    }
  })(req, res, next);
});


router.post(
  "/login",
  passport.authenticate("local-login"),
  (req, res) => {
    res.cookie("userid", req.user.ID, {
      maxAge: 900000,
      httpOnly: true
    });
    res.json({});
  }
);


module.exports = router;