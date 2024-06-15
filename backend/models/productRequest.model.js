const mongoose = require("mongoose");
const { z } = require("zod");

const productRequestStatusEnum = {
  CREATED: "CREATED",
  SUBADMIN_APPROVED: "SUBADMIN_APPROVED",
  SUBADMIN_REJECTED: "SUBADMIN_REJECTED",
  ADMIN_APPROVED: "ADMIN_APPROVED",
  ADMIN_REJECTED: "ADMIN_REJECTED",
};

const productRequestModes = {
  NEW_LISTING: "NEW_LISTING",
  ADD_QTY: "ADD_QTY",
};

// Define the Mongoose schema
const ProductRequestSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    status: {
      type: String,
      enum: Object.keys(productRequestStatusEnum),
      default: productRequestStatusEnum.CREATED,
    },
    remark: {
      type: String,
      max: [200, "Product Request Remark shouldn't exceed 200 char"],
    },
    mode: {
      type: String,
      enum: Object.keys(productRequestModes),
      required: [true, "Mode is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      default: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperUser",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the Zod schema
const productRequestZodSchema = z.object({});

// Validation function using Zod
const validateData = (data) => {
  return productRequestZodSchema.safeParse(data);
};

// Export the Mongoose model, Zod schema, and validation function
module.exports = {
  ProductRequest: mongoose.model("ProductRequest", ProductRequestSchema),
  validateData,
  productRequestModes,
  productRequestStatusEnum,
};
