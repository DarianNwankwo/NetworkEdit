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

    let CREATE_USER_SQL = `
      INSERT INTO Users (Fullname, Email, PasswordHash)
      VALUES ("${fullname}", "${email}", "${password}");
    `;

    await database.query(CREATE_USER_SQL, async (err, okpacket) => {
      console.log("OkPacket: ", okpacket);
      if (err) { return done(err); }
      if (okpacket.affectedRows > 0) {
        let FIND_USER_BY_ID_SQL = `SELECT * FROM Users WHERE ID=${okpacket.insertId};`;
        await database.query(FIND_USER_BY_ID_SQL, async(err, rows) => {
          if (err) { return done(err); }
          else { return done(null, rows[0]); }
        })
      } else {
        return done(new Error("User already exists..."));
      }
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