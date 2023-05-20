const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const incomeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'IncomeCategory'
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const IncomeCategory = mongoose.model('IncomeCategory', categorySchema);
const Income = mongoose.model('Income', incomeSchema);

module.exports = {IncomeCategory, Income};
