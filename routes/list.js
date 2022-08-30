const express = require("express");
const listRouter = express.Router();
const {
  getList,
  addList,
  updateList,
  deleteList,
  searchTodoItem,
  updateTodoItem,
} = require("./controllers/list.controller");

listRouter.get("/list", getList);
listRouter.post("/list", addList);
listRouter.patch("/list", updateList);
listRouter.delete("/list", deleteList);
listRouter.post("/list/search", searchTodoItem);
listRouter.patch("/list/item", updateTodoItem);

module.exports = listRouter;
