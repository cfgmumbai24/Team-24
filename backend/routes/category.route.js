const express = require("express");
const {
  createCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/category.controller");
const router = express.Router();

router.route("/").get(getCategories).post(createCategory);

router.route("/:id").delete(deleteCategory);

module.exports = router;
