const List = require("../../models/List");

exports.addList = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    const newList = await List.create({ name });
    res.status(201).json({ result: newList });
  } catch (error) {
    // next(error);
    //   createError(
    //     ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
    //     ERROR_MESSAGE.OCCURRED_SERVER_ERROR
    //   )
  }
};
