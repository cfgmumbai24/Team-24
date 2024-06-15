const mongoose = require("mongoose");
const { object, string, array, number } = require("zod");

// Define the Zod schema
const cartZodSchema = object({
  userId: string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid user ID",
  }),
  items: array(
    object({
      productId: string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid product ID",
      }),
      qty: number()
        .int()
        .positive({ message: "Quantity must be a positive integer" }),
    })
  ),
});

// Define the Mongoose schema
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, required: true, min: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Validation function using Zod
const validateCart = function (data) {
  return cartZodSchema.safeParse(data);
};

// Export the Mongoose model and validation function
module.exports = {
  Cart: mongoose.model("Cart", CartSchema),
  validateCart,
};
