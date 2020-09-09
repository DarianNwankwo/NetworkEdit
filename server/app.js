require("dotenv").config();


const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const database = require("./db");
const indexRouter = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/


module.exports = app;