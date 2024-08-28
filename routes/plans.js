const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// Get all plans
router.get('/get-all-plans', async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;
