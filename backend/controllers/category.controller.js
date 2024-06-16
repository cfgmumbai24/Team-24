const { Category, validateCategory } = require("../models/category.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");

exports.createCategory = async (req, res) => {
  try {
    const data = req.body;

    // Validate the incoming data using Zod
    const validationResult = validateCategory(data);
    if (!validationResult.success) {
      return HTTPError(
        res,
        400,
        "Field validation failed!",
        validationResult.error.flatten().fieldErrors
      );
    }

    // Create a new category using the validated data
    const newCategory = await Category.create(validationResult.data);

    // Respond with a success message
    return new HTTPResponse(
      res,
      true,
      201,
      "Category created successfully!",
      null,
      { category: newCategory }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate that the categoryId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return HTTPError(res, 400, "Invalid category ID", {
        categoryId: "Category ID is not a valid ObjectId",
      });
    }

    // Find and delete the category by ID
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return HTTPError(
        res,
        404,
        "Category not found",
        "No category with the given ID exists."
      );
    }

    // Respond with a success message
    return HTTPResponse(
      res,
      true,
      200,
      "Category deleted successfully!",
      null,
      { category: deletedCategory }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};

exports.getCategories = async (req, res) => {
  try {
    // Retrieve all categories
    const categories = await Category.find().sort({ name: 1 });

    // Respond with the list of categories
    return new HTTPResponse(
      res,
      true,
      200,
      "Categories retrieved successfully!",
      null,
      { categories }
    );
  } catch (error) {
    console.error("Error retrieving categories:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};
