const { Product, validateUpdateProduct } = require("../models/product.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate data using Zod
    const validationResult = validateUpdateProduct(req.body);
    if (!validationResult.success) {
      return new HTTPError(
        res,
        400,
        "Field validation failed!",
        validationResult.error.flatten().fieldErrors
      );
    }

    // Destructure validated data
    const { title, description, category } = validationResult.data;

    const existingProduct = await Product.findByIdAndUpdate(
      productId,
      { title, description, category },
      { new: true }
    );

    if (!existingProduct) {
      return new HTTPError(
        res,
        404,
        `Product id ${productId} doesn't exist`,
        "resource not found"
      );
    }

    return new HTTPResponse(res, true, 200, null, null, {
      product: existingProduct,
    });
  } catch (error) {
    console.log("updateProduct: ", error);
    return new HTTPError(res, 500, error.message, error);
  }
};
