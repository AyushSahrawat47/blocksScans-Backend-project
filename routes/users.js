const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Plan = require('../models/Plan');

// Get all users
router.get('/get-all-users', async (req, res) => {
    try {
        //this will return every object in User (which in terms is every user stored in database)
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User by Id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Fetch user by ID
        if (!user) return res.status(404).json({ message: 'Nah! Nothing Found !!' });
        res.status(200).json(user); // Send back the user
    } catch (err) {
        res.status(500).json({ message: err.message }); // Error handling
    }
});

// Create a new user
router.post('/create-user', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        // Create a new user
        const newUser = new User({ name, email, password });

        // Save user to the database
        await newUser.save();

        // Respond with the created user
        res.status(201).json(newUser);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;