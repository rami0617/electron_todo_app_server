const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
      default: "todo",
    },
    dueDate: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("list", listSchema);
