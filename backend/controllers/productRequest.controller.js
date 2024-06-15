const { default: mongoose } = require("mongoose");
const { Product } = require("../models/product.model");
const {
  ProductRequest,
  productRequestModes,
  productRequestStatusEnum,
} = require("../models/productRequest.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");
const bcrypt = require("bcryptjs");
const sharp = require("sharp");
const config = require("../config/config.js");
const uploadToS3 = require("../utils/uploadToS3");
const Jimp = require("jimp");

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
      console.log(result);
      // result = await storeProductImageUsingJimp(product, image);
      imageUrl = result.object_url;
      product.imgLink = imageUrl;
      await product.save();
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

exports.getAllProductRequest = async (req, res) => {
  try {
    const requests = await ProductRequest.find().sort({ createdAt: -1 });

    return new HTTPResponse(res, true, 200, null, null, {
      requests,
    });
  } catch (error) {
    console.log("getAllProductRequest: ", error);
    return new HTTPError(res, 500, error.message, error);
  }
};

exports.getAllProductRequestForClusterUser = async (req, res) => {
  try {
    const requests = await ProductRequest.find({
      user: req.superUser._id,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    return new HTTPResponse(res, true, 200, null, null, {
      requests,
    });
  } catch (error) {
    console.log("getAllProductRequestForClusterUser: ", error);
    return new HTTPError(res, 500, error.message, error);
  }
};

exports.getAllProductRequestForSubAdmin = async (req, res) => {
  try {
    const requests = await ProductRequest.find({
      status: productRequestStatusEnum.CREATED,
    })
      .product("product")
      .sort({ createdAt: -1 });

    return new HTTPResponse(res, true, 200, null, null, {
      requests,
    });
  } catch (error) {
    console.log("getAllProductRequestForSubAdmin: ", error);
    return new HTTPError(res, 500, error.message, error);
  }
};

exports.getAllProductRequestForAdmin = async (req, res) => {
  try {
    const requests = await ProductRequest.find({
      status: productRequestStatusEnum.SUBADMIN_APPROVED,
    })
      .product("product")
      .sort({ createdAt: -1 });

    return new HTTPResponse(res, true, 200, null, null, {
      requests,
    });
  } catch (error) {
    console.log("getAllProductRequestForAdmin: ", error);
    return new HTTPError(res, 500, error.message, error);
  }
};

exports.approveProductRequestForSubAdmin = async (req, res) => {
  try {
    const productId = req.params.id;
    const request = await ProductRequest.findByIdAndUpdate(productId, {
      status: productRequestStatusEnum.SUBADMIN_APPROVED,
    });

    return new HTTPResponse(res, true, 200, null, null, {
      request,
    });
  } catch (error) {
    console.log("approveProductRequestForSubAdmin: ", error);
    return new HTTPError(res, 500, error.message, error);
  }
};

exports.rejectProductRequestForSubAdmin = async (req, res) => {
  try {
    const productId = req.params.id;
    const request = await ProductRequest.findByIdAndUpdate(productId, {
      status: productRequestStatusEnum.SUBADMIN_REJECTED,
    });

    return new HTTPResponse(res, true, 200, null, null, {
      request,
    });
  } catch (error) {
    console.log("rejectProductRequestForSubAdmin: ", error);
    return new HTTPError(res, 500, error.message, error);
  }
};

exports.approveProductRequestForAdmin = async (req, res) => {
  try {
    const productId = req.params.id;
    const request = await ProductRequest.findByIdAndUpdate(productId, {
      status: productRequestStatusEnum.ADMIN_APPROVED,
    });

    await Product.findByIdAndUpdate(request.product._id, {
      isLive: true,
    });

    return new HTTPResponse(res, true, 200, null, null, {
      request,
    });
  } catch (error) {
    console.log("approveProductRequestForAdmin: ", error);
    return new HTTPError(res, 500, error.message, error);
  }
};

exports.rejectProductRequestForAdmin = async (req, res) => {
  try {
    const productId = req.params.id;
    const request = await ProductRequest.findByIdAndUpdate(productId, {
      status: productRequestStatusEnum.ADMIN_REJECTED,
    });

    return new HTTPResponse(res, true, 200, null, null, {
      request,
    });
  } catch (error) {
    console.log("approveProductRequestForAdmin: ", error);
    return new HTTPError(res, 500, error.message, error);
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

const storeProductImageUsingJimp = async (product, image) => {
  try {
    const jimpImage = await Jimp.read(image.data);
    const convertedBuffer = await jimpImage.getBufferAsync(Jimp.MIME_WEBP);

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
