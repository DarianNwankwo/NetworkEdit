require("dotenv").config();


const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");

require("./config/passport-setup");
const database = require("./db");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const { createUsersTable } = require("./db/utils");

const app = express();
createUsersTable(database);

// passport setup start
// passport.use()
// passport setup end

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);


app.use("/", indexRouter);
app.use("/auth", authRouter);

// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/


module.exports = app;