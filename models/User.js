const mongoose = require('mongoose');

// Define the schema for User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1 // Ensure name is not empty
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Ensure password is long enough
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation date
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
