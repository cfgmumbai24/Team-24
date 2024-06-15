const express = require("express");
const {
  createCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/category.controller");
const router = express.Router();

// Route for retrieving all categories

router.get("/categories", getCategories);

// Route for creating a new category
router.post("/categories", createCategory);

// Route for deleting a category by ID
router.delete("/categories/:id", deleteCategory);

module.exports = router;
