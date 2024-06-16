const { COOKIE_TIME } = require("../config/config");

const cookieToken = (user, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + COOKIE_TIME * 24 * 60 * 60 * 1000),
    // domain: "",
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    message: "Login successful",
    error: null,
    data: {
      token,
      user,
    },
  });
};

module.exports = cookieToken;
