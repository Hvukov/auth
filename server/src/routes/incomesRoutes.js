const express = require('express');
const router = express.Router();
const {createIncome, getIncomes, getOneIncome, updateIncome, deleteIncome} = require('../controllers/incomesController');

router.post('/incomes', createIncome);
router.get('/incomes', getIncomes);

module.exports = router;