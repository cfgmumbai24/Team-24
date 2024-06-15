const {
  User,
  validateUser,
  updateUserZodSchema,
} = require("../models/user.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const data = req.body;

    const validationResult = validateUser(data);
    if (!validationResult.success) {
      return new HTTPError(
        res,
        400,
        "Field validation failed!",
        validationResult.error.flatten().fieldErrors
      );
    }

    const { name, email, password } = data;

    // TODO: add pasword validation here
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      hashedPassword: hashedPassword,
    });

    return new HTTPResponse(
      res,
      true,
      201,
      "User created successfully!",
      null,
      { user: newUser }
    );
  } catch (error) {
    console.log(error);
    return new HTTPError(res, 500, error, "internal server error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    const validationResult = updateUserZodSchema.safeParse(data);
    if (!validationResult.success) {
      return new HTTPError(
        res,
        400,
        "Field validation failed!",
        validationResult.error.flatten().fieldErrors
      );
    }

    const { name, contact, address } = data;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, contact, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return new HTTPError(
        res,
        404,
        "User not found",
        "No user found with the given ID."
      );
    }

    return new HTTPResponse(
      res,
      true,
      200,
      "User updated successfully!",
      null,
      { user: updatedUser }
    );
  } catch (error) {
    console.log(error);
    return new HTTPError(res, 500, error, "Internal server error");
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email }).select("+hashedPassword");
    if (!user) {
      return HTTPError(
        res,
        401,
        "Authentication failed",
        "Invalid email or password."
      );
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return HTTPError(
        res,
        401,
        "Authentication failed",
        "Invalid email or password."
      );
    }

    // Generate JWT token or any session management logic here
    // For example, generate JWT token:
    // const token = generateJWTToken(user); // Implement your own token generation logic

    // Respond with success
    return HTTPResponse(
      res,
      true,
      200,
      "Authentication successful!",
      null,
      { user }
    );
  } catch (error) {
    console.error("Signin error:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};
