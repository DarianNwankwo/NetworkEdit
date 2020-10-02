const express = require('express');
const router = express.Router();


function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("You are not authenticated.");
  }
}

/* GET home page. */
router.get('/', checkAuthentication, function(req, res) {
  console.log("Index Route User: ", req.user);
  console.log("Request Cookies: ", req.cookies);
  res.status(200).json({
    message: "Root Request",
  })
});


module.exports = router;