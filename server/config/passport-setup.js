const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const database = require("../db");


passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, email, password, done) => {
    console.log("Local Strategy Signup...");
  })
);

passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, email, password, done) => {
    console.log("Local Strategy Login...");
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let FIND_USER_SQL = `SELECT * FROM Users WHERE ID=${id};`
  
  database.query(FIND_USER_SQL, (err, rows) => {
    console.log(rows);
    done(err, rows[0]);
  });
})