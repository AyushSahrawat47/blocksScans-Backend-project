const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const User = require('../models/User');

// Get all plans
router.get('/get-all-plans', async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//switch user plan
router.put('/switch-plan/:userId', async (req, res) => {
    
    const { userId } = req.params;
    const { planId } = req.body;

    try {
        //Finds the required user and plan by the means of Id
        const user = await User.findById(userId);
        const plan = await Plan.findById(planId);

        //If either the user or the plan is not found, an error will be thrown
        if (!user || !plan) {
            return res.status(404).json({ message: "User or Plan not found" });
        }


        user.plan = plan._id;
        await user.save();

        res.status(200).json({
            message: `Plan switched to ${plan.title}`,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Populate database with example plans
router.post('/populate-plans', async (req, res) => {
    const examplePlans = [
        {
            title: "Free Plan",
            description: "Basic access with limited features",
            price: 0,
            max_req_per_sec: 5
        },
        {
            title: "Standard Plan",
            description: "Standard access with more features",
            price: 10,
            max_req_per_sec: 20
        },
        {
            title: "Premium Plan",
            description: "Full access with all features",
            price: 50,
            max_req_per_sec: 50
        }
    ];

    try {
        await Plan.insertMany(examplePlans);
        res.status(201).json({ message: "Example data populated successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;
