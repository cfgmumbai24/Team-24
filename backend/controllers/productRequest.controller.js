const { default: mongoose } = require("mongoose");
const { Product } = require("../models/product.model");
const {
  ProductRequest,
  productRequestModes,
} = require("../models/productRequest.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");
const bcrypt = require("bcryptjs");
const sharp = require("sharp");
const config = require("../config/config.js");
const uploadToS3 = require("../utils/uploadToS3");

// TODO: add auth and req.user accesss
exports.createProductRequestByClusterUser = async (req, res) => {
  try {
    const data = req.body;

    const { sku, remark, category } = data;
    let mode = productRequestModes.NEW_LISTING;
    let productFound = false;
    let product;

    // Check if SKU is provided and find the product
    if (sku) {
      product = await Product.findById(sku);
      productFound = product ? true : false;
    }

    // Handle image upload if present
    let imageUrl;

    // If product is not found, create a new one
    if (!product) {
      product = new Product({
        title: " ",
        description: " ",
        category: new mongoose.Types.ObjectId(category),
      });
      await product.save();
    } else {
      mode = productRequestModes.ADD_QTY;
    }

    if (!productFound && req.files && req.files.image) {
      const image = req.files.image;
      result = await storeProductImage(product, image);
      imageUrl = result.secure_url;
    }

    // Create a new product request
    const newProductRequest = await ProductRequest.create({
      product: product._id,
      remark: remark,
      mode: mode,
      user: req.superUser._id,
    });

    return new HTTPResponse(
      res,
      true,
      201,
      "Product request created successfully!",
      null,
      { productRequest: newProductRequest }
    );
  } catch (error) {
    console.error("createProductRequestByClusterUser:", error);
    return new HTTPError(res, 500, error.message, "Internal server error");
  }
};

const storeProductImage = async (product, image) => {
  try {
    const convertedBuffer = await sharp(image.data).toFormat("webp").toBuffer();
    let data = await uploadToS3(
      "cfg-products",
      product._id + ".webp", // converting to webp since optimized for web
      convertedBuffer
    );
    return data;
  } catch (error) {
    throw error;
  }
};
