require("dotenv").config();
require("./config/db")();

const createError = require("http-errors");
const express = require("express");
const path = require("path");

const cors = require("cors");

const app = express();
const indexRouter = require("./routes/list");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credential: "true",
  })
);

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
