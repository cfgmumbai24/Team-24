const mongoose = require("mongoose");
const { object, string, array, number, nullable } = require("zod");

// Define the Zod schema
const inquiryRequestZodSchema = object({
  userId: string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid user ID",
  }),
  productIds: array(
    object({
      productId: string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid product ID",
      }),
      qty: number()
        .int()
        .positive({ message: "Quantity must be a positive integer" }),
    })
  ),
  poc: nullable(
    string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid point of contact user ID",
    })
  ),
});

// Define the Mongoose schema
const InquiryRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productIds: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, required: true, min: 1 },
      },
    ],
    poc: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  }
);

// Validation function using Zod
const validateData = function (data) {
  return inquiryRequestZodSchema.safeParse(data);
};

// Export the Mongoose model and validation function
module.exports = {
  InquiryRequest: mongoose.model("InquiryRequest", InquiryRequestSchema),
  validateInquiryRequest: validateData,
};
