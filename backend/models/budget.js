const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        amountBudgeted: {
            type: Number,
            required: true
        },
        amountSpent: {
            type: Number,
            required: true
        }
    }
)

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lineItems: {
            type: [lineItemSchema]
        }
    },
    { timestamps: true }
)

const budgetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        accountsUsed: {
            type: [mongoose.Types.ObjectId]
        },
        categories: {
            type: [categorySchema]
        }
    },
    { timestamps: true }
)

module.exports = budgetSchema;