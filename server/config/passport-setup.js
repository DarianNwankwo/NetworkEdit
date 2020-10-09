const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const database = require("../db");


passport.use("local-register", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    let { fullname } = req.body;

    // Check if the user already exists. If they do, give an error
    let CHECK_USER_SQL = `SELECT email FROM Users WHERE email="${email}";`;
    await database.query(CHECK_USER_SQL, async (err1, rows) => {
      if (err1) { return done(err1); }
      if (rows.length > 0) { return done("User already exists"); }

      // If the user is novel, create the user
      let CREATE_USER_SQL = `
        INSERT INTO Users (Fullname, Email, PasswordHash)
        VALUES ("${fullname}", "${email}", "${password}");
      `;

      await database.query(CREATE_USER_SQL, async (err2, okpacket) => { 
        if (err2) { return done(err2); }
        if (okpacket.affectedRows > 0) {
          // If we've successfully created the user, grab that user and pass it to done callback.
          let FIND_USER_BY_ID_SQL = `SELECT * FROM Users WHERE ID=${okpacket.insertId};`;

          await database.query(FIND_USER_BY_ID_SQL, async(err3, rows) => {
            if (err3) { return done(err3); }
            else { return done(null, rows[0]); }
          });
        }
      });
    });
  })
);

passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    let FIND_USER_BY_EMAIL_SQL = `SELECT * FROM Users WHERE email="${email}";`;

    await database.query(FIND_USER_BY_EMAIL_SQL, async (err, rows) => {
      if (rows.length > 0) {
        await bcrypt.compare(password, rows[0].PasswordHash, (err, result) => {
          if (result) { return done(null, rows[0]); }
          else { return done(null, false); }
        });
      }
    });
  })
);


passport.serializeUser((user, done) => {
  console.log("Serializing: ", user);
  return done(null, user.ID);
});


passport.deserializeUser((id, done) => {
  let FIND_USER_SQL = `SELECT * FROM Users WHERE ID=${id};`
  
  database.query(FIND_USER_SQL, (err, rows) => {
    return done(err, rows[0]);
  });
})