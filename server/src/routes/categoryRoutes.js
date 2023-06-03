const express = require("express");
const router = express.Router();

const {getCategories,getOneCategory, createCategory, updateCategory, updateSubcategory, deleteCategory} = require("../controllers/categoriesController")

router.get("/categories", getCategories)

router.get("/categories/:id", getOneCategory)

router.post("/categories", createCategory)

router.patch("/categories/:id", updateCategory)

router.delete("/categories/:id", deleteCategory)

router.patch("/categories/:categoryId/subcategories/:subcategoryId", updateSubcategory)

module.exports = router;

/**
 * 645e480975c23b1b6451b96b
6463c53f2f1cf323d22facb6
 */