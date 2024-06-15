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
    // _id is the sku
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    imgLink: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      default: 0,
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
  quantity: z.number(),
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
