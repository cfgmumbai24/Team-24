const mongoose = require("mongoose");
const { object, string } = require("zod");

// Define the Zod schema
const userZodSchema = object({
  name: string()
    .max(100, "Username should be less than 100 characters.")
    .nonempty("Username missing."),
  email: string()
    .email("Invalid email address.")
    .nonempty("Email is required."),
  hashedPassword: string().nonempty("Password is required."),
  contact: string().nonempty("Contact is required."),
  address: string().optional(),
});

// Define the Mongoose schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, "Username should be less than 100 characters."],
      required: [true, "Username missing."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
      select: false,
    },
    contact: {
      type: String,
      required: [true, "Contact is required."],
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Validation function using Zod
const validateData = function (data) {
  return userZodSchema.safeParse(data);
};

const updateUserZodSchema = object({
  name: string()
    .max(100, "Username should be less than 100 characters.")
    .nonempty("Username missing."),
  contact: string().nonempty("Contact is required."),
  address: string().optional(),
});

// Export the Mongoose model and validation function
module.exports = {
  User: mongoose.model("User", UserSchema),
  validateUser: validateData,
  updateUserZodSchema,
};
