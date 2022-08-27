const express = require("express");
const indexRouter = express.Router();
const { addList } = require("./controllers/list.controller");

indexRouter.post("/", addList);

module.exports = indexRouter;
