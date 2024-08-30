const express = require('express');
const router = express.Router();
const ApiUsage = require('../models/ApiUsage');

// Get all usage stats
router.get('/', async (req, res) => {
    try {
        const stats = await ApiUsage.find();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get usage stats for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userStats = await ApiUsage.find({ user: userId });
        res.status(200).json(userStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
