const HTTPError = require("../utils/HTTPError");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const { SuperUser, superUserRoles } = require("../models/superUser.model");
const { default: mongoose } = require("mongoose");

exports.isLoggedInSuperUser = async (req, res, next) => {
  try {
    // if no token is sent
    if (!("token" in req.cookies) && !("authorization" in req.headers)) {
      return next(
        new HTTPError(
          res,
          401,
          "Login to access this resource",
          "Unauthorized client error"
        )
      );
    }

    // fetch n decode the token
    const token =
      req.cookies.token ?? req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, JWT_SECRET);
    // find the user
    const superUser = await SuperUser.findById(decoded.id);
    // if no such user found
    if (!superUser) {
      req.superUser = {};
      return next(new HTTPError(res, 404, "invalid token", "user not found"));
    }

    // add user to request object for further use
    req.superUser = superUser;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new HTTPError(
          res,
          403,
          "Auth token expired: please login again",
          "TokenExpired"
        )
      );
    } else if (error instanceof jwt.JsonWebTokenError) {
      return next(
        new HTTPError(res, 401, "invalid token", "Unauthorized client error")
      );
    }
    console.log("isLoggedInSuperUser: ", error);
    return next(new HTTPError(res, 500, "Internal server error", error));
  }
};

exports.checkRole = (role) => {
  return async (req, res, next) => {
    if (req.superUser.role == role) {
      next();
    } else {
      return next(
        new HTTPError(
          res,
          401,
          "Your role is not allowed to access",
          "UNAUTHORIZED"
        )
      );
    }
  };
};


exports.isLoggedInUser = async (req, res, next) => {
  try {
    // if no token is sent
    if (!("token" in req.cookies) && !("authorization" in req.headers)) {
      return next(
        new HTTPError(
          res,
          401,
          "Login to access this resource",
          "Unauthorized client error"
        )
      );
    }

    // fetch n decode the token
    const token =
      req.cookies.token ?? req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, JWT_SECRET);
    // find the user
    const user = await User.findById(decoded.id);
    // if no such user found
    if (!user) {
      req.user = {};
      return next(new HTTPError(res, 404, "invalid token", "user not found"));
    }

    // add user to request object for further use
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new HTTPError(
          res,
          403,
          "Auth token expired: please login again",
          "TokenExpired"
        )
      );
    } else if (error instanceof jwt.JsonWebTokenError) {
      return next(
        new HTTPError(res, 401, "invalid token", "Unauthorized client error")
      );
    }
    console.log("isLoggedInUser: ", error);
    return next(new HTTPError(res, 500, "Internal server error", error));
  }
};