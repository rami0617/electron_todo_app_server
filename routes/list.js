const express = require("express");
const indexRouter = express.Router();
const {
  getList,
  addList,
  updateList,
  deleteList,
  searchItem,
} = require("./controllers/list.controller");

indexRouter.get("/", getList);
indexRouter.post("/", addList);
indexRouter.patch("/", updateList);
indexRouter.delete("/", deleteList);
indexRouter.post("/search", searchItem);

module.exports = indexRouter;
