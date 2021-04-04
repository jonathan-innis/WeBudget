const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Budget', 'Tracking', 'Closed'],
            required: true
        },
        accountValue: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
)

module.exports = accountSchema;