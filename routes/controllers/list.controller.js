const List = require("../../models/List");
const createError = require("http-errors");
const {
  HTTP_STATUS_CODE,
  ERROR_STATUS_CODE,
  ERROR_MESSAGE,
} = require("../../constants");

exports.getList = async (req, res, next) => {
  try {
    const newList = await List.find().lean();

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({ result: newList });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.addList = async (req, res, next) => {
  const { name, date } = req.body;

  if (!name || !date) {
    next(createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA));
  }

  try {
    const newList = await List.create({ name: name, dueDate: date });

    res.status(HTTP_STATUS_CODE.CREATE_SUCCESS).json({ result: newList });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.updateList = async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    next(createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA));
  }

  try {
    await List.findByIdAndUpdate(id, { status: "done" });

    const newList = await List.find().lean();

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({ result: newList });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.deleteList = async (req, res, next) => {
  const { id } = req.headers;

  if (!id) {
    next(createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA));
  }

  try {
    await List.deleteOne({ _id: id });

    const result = await List.find().lean();

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({ result });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.searchItem = async (req, res, next) => {
  const { keyword } = req.body;

  if (!keyword) {
    next(createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA));
  }

  try {
    const result = await List.find({ name: { $regex: keyword } }).lean();

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({ result });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.updateItem = async (req, res, next) => {
  const { id, item, date } = req.body;

  if (!id || !item || !date) {
    next(createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA));
  }

  try {
    await List.findByIdAndUpdate(id, { name: item, dueDate: date });

    const result = await List.find().lean();

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({ result });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};
