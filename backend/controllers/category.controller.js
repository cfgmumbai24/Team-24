const { Category, validateCategory } = require("../models/category.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");

exports.createCategory = async (req, res) => {
  try {
    const data = req.body;

    const validationResult = validateCategory(data);
    if (!validationResult.success) {
      return new HTTPError(
        res,
        400,
        "Field validation failed!",
        validationResult.error.flatten().fieldErrors
      );
    }

    const { category } = req.body;

    const newCategory = await Category.create({});

    return new HTTPResponse(
      res,
      true,
      201,
      "Category created successfully!",
      null,
      { avatar: newAvatar }
    );
  } catch (error) {
    console.log(error);
    return new HTTPError(res, 500, error, "internal server error");
  }
};
