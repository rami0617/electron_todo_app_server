const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    dueDate: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("list", listSchema);
