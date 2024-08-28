const mongoose = require('mongoose');

// Define the schema for API Key
const apiKeySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the API Key model
const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;

