const express = require("express");
const router = express.Router();

const {getCategories,getOneCategory, createCategory, updateCategory} = require("../controllers/categoriesController")

router.get("/categories", getCategories)

router.get("/categories/:id", getOneCategory)

router.post("/categories", createCategory)

router.patch("/categories/:id", updateCategory)

module.exports = router;