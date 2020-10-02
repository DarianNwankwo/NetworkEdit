require("dotenv").config();


const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");

const database = require("./db");
const { createUsersTable } = require("./db/utils");

const app = express();
createUsersTable(database);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true
  })
);
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  cookieParser(process.env.SESSION_SECRET)
);
require("./config/passport-setup");
app.use(passport.initialize());
app.use(passport.session());


const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");


app.use("/", indexRouter);
app.use("/auth", authRouter);

// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/


module.exports = app;