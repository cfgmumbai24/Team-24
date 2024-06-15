const { User, validateUser } = require("../models/user.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");
const bcrypt = require("bcrypt");

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
