const express = require("express");
const upload = require('../middlewares/upload');
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryTree,
} = require("../controllers/categoryController.js");

const router = express.Router();

// ➤ Create Category
router.post("/add-category", upload.array("images",5), createCategory);

// ➤ Get all Categories
router.get("/get-all-categories", getAllCategories);

// ➤ Get Category Tree
router.get("/get-category-tree", getCategoryTree);

// ➤ Delete Category
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;
