const mongoose = require("mongoose");
const { object, string } = require("zod");

// Define the Zod schema
const categoryZodSchema = object({
  name: string()
    .max(100, "Category should be less than 100 characters.")
    .nonempty("Category missing."),
});

// Define the Mongoose schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, "Category should be less than 100 characters."],
      required: [true, "Category missing."],
    },
  },
  {
    timestamps: true,
  }
);

// Validation function using Zod
const validateCategory = function (data) {
  return categoryZodSchema.safeParse(data);
};

// Export the Mongoose model and validation function
module.exports = {
  Category: mongoose.model("Category", CategorySchema),
  validateCategory,
};
