const mongoose = require("mongoose");
const { z } = require("zod");

const productStatusEnum = [
  "CREATED",
  "SUBADMIN-APPROVED",
  "SUBADMIN-REJECTED",
  "ADMIN-APPROVED",
  "ADMIN-REJECTED",
];

// Define the Mongoose schema
const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "SKU is required."],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    imgLink: {
      type: String,
      required: [true, "Image link is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },
    status: {
      type: String,
      enum: productStatusEnum,
      required: [true, "Status is required."],
      default: "CREATED",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: [0, "Quantity cannot be negative."],
    },
  },
  {
    timestamps: true,
  }
);

// Define the Zod schema
const productZodSchema = z.object({
  sku: z.string().nonempty("SKU is required."),
  title: z.string().nonempty("Title is required."),
  imgLink: z
    .string()
    .url("Invalid image URL.")
    .nonempty("Image link is required."),
  description: z.string().nonempty("Description is required."),
  category: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid category ID.",
  }),
  status: z.enum(productStatusEnum).default("CREATED"),
  quantity: z
    .number()
    .nonnegative("Quantity cannot be negative.")
    .int()
    .nonempty("Quantity is required."),
});

// Validation function using Zod
const validateProduct = (data) => {
  return productZodSchema.safeParse(data);
};

// Export the Mongoose model, Zod schema, and validation function
module.exports = {
  Product: mongoose.model("Product", ProductSchema),
  validateProduct,
};
