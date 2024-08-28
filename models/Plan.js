const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: {
        type: Number,
        required: true
    },
    max_req_per_sec: {
        type: Number,
        required: true
    },
    inserted_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
