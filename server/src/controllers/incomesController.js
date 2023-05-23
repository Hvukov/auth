const {Income} = require('../models/income');

const createIncome = async (req,res) => {
    try {
        const {user, category, amount, date} = req.body;
        const newIncome = new Income({user, category, amount, date});
        await newIncome.save();
        res.status(201).json({
            message: `Income created`,
            data: newIncome
        })
    } catch (error) {
        res.status(500).json({message: "Income not created"})
    }
}

const getIncomes = async (req,res) => {
    try {
        const incomes = await Income.find();
        if(!incomes) return res.status(404).json({message: "Incomes not found"});
        res.status(200).json({
            message: `Incomes found`,
            data: incomes
        })
    } catch (error) {
        res.status(500).json({message: "Incomes not found"})
    }
}

module.exports = {createIncome, getIncomes}