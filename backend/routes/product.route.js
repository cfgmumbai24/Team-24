const express = require("express");
const { signup, updateProduct } = require("../controllers/product.controller");
const { isLoggedInSuperUser, checkRole } = require("../middlewares/user");
const router = express.Router();

router.route("/:id").patch(isLoggedInSuperUser, updateProduct);

module.exports = router;
