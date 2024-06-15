const mongoose = require("mongoose");
const { SuperUser, validateData } = require("../models/superUser.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");
const bcrypt = require("bcryptjs");
const cookieToken = require("../utils/cookieToken");

exports.createSuperUser = async (req, res) => {
  try {
    const data = req.body;
    const { name, email, role } = data;

    // Validate the incoming data using Zod
    const validationResult = validateData(data);
    if (!validationResult.success) {
      return new HTTPError(
        res,
        400,
        "Field validation failed!",
        validationResult.error.flatten().fieldErrors
      );
    }

    // Check if the user already exists
    const existingUser = await SuperUser.findOne({ email });
    if (existingUser) {
      return new HTTPError(
        res,
        409, // Conflict
        "Email already registered!",
        "A user with this email already exists."
      );
    }

    // Generate and hash the password
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create a new user using the validated data
    const newUser = await SuperUser.create({
      name,
      email,
      hashedPassword,
      role,
    });

    // Respond with a success message
    return new HTTPResponse(
      res,
      true,
      201,
      "User created successfully!",
      null,
      {
        user: newUser,
        generatedPassword,
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new HTTPError(res, 500, "Internal server error", error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "invalid/insufficient input provided!",
      });
    }

    const existingUser = await SuperUser.findOne({ email: email }).select(
      "hashedPassword"
    );
    if (!existingUser) {
      return new HTTPError(
        res,
        404,
        "Super User not found",
        `User with ${email} doesn't exist`
      );
    }

    const isValid = bcrypt.compare(password, existingUser.hashedPassword);

    if (!isValid) {
      return new HTTPError(
        res,
        403,
        "Incorrect credentials",
        "Password doesn't match"
      );
    }

    cookieToken(existingUser, res);
  } catch (error) {
    console.log("Super user login:", error);
    return new HTTPError(res, 500, error.message, error);
  }
};

exports.logout = (req, res) => {
  // Delete the prexisting cookie of user by sending a Stale cookie

  const options = {
    expires: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    // domain: "",
    httpOnly: true,
  };

  return res.cookie("token", null, options).status(200).json({
    success: true,
    message: "Logout success",
  });
};

exports.deleteSuperUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return HTTPError(res, 400, "Invalid user ID", {
        id: "User ID is not a valid ObjectId",
      });
    }

    // Find and delete the user by ID
    const deletedUser = await SuperUser.findByIdAndDelete(id);

    if (!deletedUser) {
      return HTTPError(
        res,
        404,
        "User not found",
        "No user with the given ID exists."
      );
    }

    // Respond with a success message
    return HTTPResponse(res, true, 200, "User deleted successfully!", null, {
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};

exports.getSuperUsers = async (req, res) => {
  try {
    // Retrieve all super users
    const superUsers = await SuperUser.find();

    // Respond with the list of super users
    return HTTPResponse(res, true, 200, "Users retrieved successfully!", null, {
      users: superUsers,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};
