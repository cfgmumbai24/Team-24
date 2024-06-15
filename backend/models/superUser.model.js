const mongoose = require("mongoose");
const { object, string, enum: _enum, number } = require("zod");

const superUserZodSchema = object({
  name: string().max(100),
});

const superUserRoles = ["ADMIN", "SUB-ADMIN", "CLUSTER-USER"];

const superUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLen: [100, "Super User Name should be less than 100 characters."],
      required: [true, "SuperUser name missing."],
    },
    email: {
      type: String,
      maxLen: [100, "SuperUser email should be less than 100 characters."],
      required: [true, "SuperUser email missing."],
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

const validateData = function (data) {
  return superUserZodSchema.safeParse(data);
};

module.exports = {
  Avatar: mongoose.model("Avatar", avatarSchema),
  validateAvatar: validateData,
};
