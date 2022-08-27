const List = require("../../models/List");
const createError = require("http-errors");

exports.getList = async (req, res, next) => {
  try {
    const newList = await List.find().lean();

    res.status(201).json({ result: newList });
  } catch (error) {
    next(createError(500, "occured server error"));
  }
};

exports.addList = async (req, res, next) => {
  try {
    const { name, date } = req.body;

    const newList = await List.create({ name: name, dueDate: date });

    res.status(201).json({ result: newList });
  } catch (error) {
    next(createError(500, "occured server error"));
  }
};

exports.updateList = async (req, res, next) => {
  try {
    const { id } = req.body;

    await List.findByIdAndUpdate(id, { status: "done" });
    const newList = await List.find().lean();

    res.status(201).json({ result: newList });
  } catch (error) {
    next(createError(500, "occured server error"));
  }
};

exports.deleteList = async (req, res, next) => {
  try {
    const { id } = req.headers;

    await List.deleteOne({ _id: id });
    const result = await List.find();

    res.status(201).json({ result: result });
  } catch (error) {
    next(createError(500, "occured server error"));
  }
};

exports.searchItem = async (req, res, next) => {
  try {
    const { keyword } = req.body;

    const result = await List.find({ name: { $regex: keyword } });

    res.status(201).json({ result: result });
  } catch (error) {
    next(createError(500, "occured server error"));
  }
};
