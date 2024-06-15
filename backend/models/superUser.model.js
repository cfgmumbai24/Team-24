const mongoose = require("mongoose");
const { object, string, enum: zodEnum } = require("zod");

// Define the roles for SuperUser
const superUserRoles = {
  ADMIN: "ADMIN",
  SUB_ADMIN: "SUB_ADMIN",
  CLUSTER_USER: "CLUSTER_USER",
};

// Define the Zod schema
const superUserZodSchema = object({
  name: string().max(
    100,
    "Super User Name should be less than 100 characters."
  ),
  email: string()
    .max(100, "Super User email should be less than 100 characters.")
    .email("Invalid email format."),
  hashedPassword: string().min(1, "SuperUser hashedPassword missing."),
  role: zodEnum(Object.keys(superUserRoles)).default("CLUSTER-USER"),
});

// Define the Mongoose schema
const superUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [100, "Super User Name should be less than 100 characters."],
      required: [true, "SuperUser name missing."],
    },
    email: {
      type: String,
      maxLength: [100, "Super User email should be less than 100 characters."],
      required: [true, "SuperUser email missing."],
    },
    hashedPassword: {
      type: String,
      required: [true, "SuperUser hashedPassword missing."],
    },
    role: {
      type: String,
      enum: Object.keys(superUserRoles),
      default: superUserRoles.CLUSTER_USER,
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

// Export the Mongoose model and validation function
module.exports = {
  SuperUser: mongoose.model("SuperUser", superUserSchema),
  validateSuperUser: validateData,
  superUserRoles,
};
