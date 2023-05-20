const express = require('express');
const router = express.Router();

const {createCategory, getCategories, getOneCategory, updateCategory,deleteCategory} = require('../controllers/incomeCategoriesController');

router.post('/incomeCategories', createCategory);

router.get('/incomeCategories', getCategories);

router.get('/incomeCategories/:id', getOneCategory);

router.patch('/incomeCategories/:id', updateCategory);

router.delete('/incomeCategories/:id', deleteCategory);

module.exports = router;