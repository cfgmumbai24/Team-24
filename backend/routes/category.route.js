const express = require("express");
const { createCategory } = require("../controllers/category.controller");
const router = express.Router();

router.route("/").post(createCategory);

module.exports = router;
