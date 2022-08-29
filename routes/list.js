const express = require("express");
const indexRouter = express.Router();
const {
  getList,
  addList,
  updateList,
  deleteList,
  searchItem,
  updateItem,
} = require("./controllers/list.controller");

indexRouter.get("/", getList);
indexRouter.post("/", addList);
indexRouter.patch("/", updateList);
indexRouter.delete("/", deleteList);
indexRouter.post("/search", searchItem);
indexRouter.patch("/item", updateItem);

module.exports = indexRouter;
