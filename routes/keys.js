const express = require('express');
const crypto = require('crypto');
const ApiKey = require('../models/ApiKey'); // Your API Key model
const router = express.Router();

// Helper function to generate a random API key
function generateApiKey() {
    return crypto.randomBytes(16).toString('hex');
}

// POST endpoint to generate a new API key
router.post('/generate', async (req, res) => {
    const { userId } = req.body;

    try {
        // Check if the user already has 3 API keys
        const keyCount = await ApiKey.countDocuments({ userId });
        if (keyCount >= 3) {
            return res.status(400).json({ message: 'User already has 3 API keys' });
        }

        // Generate a new API key
        const apiKey = generateApiKey();

        // Create and save the new API key document
        const newApiKey = new ApiKey({ userId, apiKey });
        await newApiKey.save();

        res.status(201).json({ apiKey });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

module.exports = router;
