const mongoose = require("mongoose");
const { object, string, enum: zodEnum } = require("zod");

// Define the roles
const superUserRoles = ["ADMIN", "SUB-ADMIN", "CLUSTER-USER"];

// Define the Zod schema for validation
const superUserZodSchema = object({
  name: string()
    .max(100, "Super User Name should be less than 100 characters.")
    .nonempty("SuperUser name missing."),
  email: string()
    .email("Invalid email format.")
    .max(100, "SuperUser email should be less than 100 characters.")
    .nonempty("SuperUser email missing."),
  hashedPassword: string()
    .nonempty("SuperUser hashedPassword missing."),
  role: zodEnum(superUserRoles).optional()
});

// Define the Mongoose schema
const superUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, "Super User Name should be less than 100 characters."],
      required: [true, "SuperUser name missing."],
    },
    email: {
      type: String,
      maxlength: [100, "SuperUser email should be less than 100 characters."],
      required: [true, "SuperUser email missing."],
      unique: true, // Ensure email uniqueness
    },
    hashedPassword: {
      type: String,
      required: [true, "SuperUser hashedPassword missing."],
    },
    role: {
      type: String,
      enum: superUserRoles,
      default: "CLUSTER-USER",
    },
  },
  {
    timestamps: true,
  }
);

// Validation function using Zod
const validateData = function (data) {
  return superUserZodSchema.safeParse(data);
};

module.exports = {
  SuperUser: mongoose.model("SuperUser", superUserSchema),
  validateData,
};
