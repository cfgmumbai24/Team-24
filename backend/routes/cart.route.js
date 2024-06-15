const express = require("express");

const { isLoggedInUser } = require("../middlewares/user");
const { getCartByUser } = require("../controllers/cart.controller");
const router = express.Router();

router
  .route("/")
  .get(
    isLoggedInUser,
    getCartByUser
  );

module.exports = router;
