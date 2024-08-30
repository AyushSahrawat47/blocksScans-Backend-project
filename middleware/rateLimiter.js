const ApiUsage = require('../models/ApiUsage');
const User = require('../models/User');

const rateLimiters = {}; // This object will store the rate limiter data for each user

async function rateLimiter(req, res, next) {
    const { userId } = req.body; // Get userId from the request body

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).populate('plan');

    if (!user || !user.plan) {
        return res.status(400).json({ message: 'User or Plan not found' });
    }

    const requestLimit = user.plan.max_req_per_sec;

    // Initialize rate limiter data for the user if it doesn't exist
    if (!rateLimiters[userId]) {
        rateLimiters[userId] = { lastRequestTime: Date.now(), requestCount: 0 };
    }

    const currentTime = Date.now();
    const elapsedTime = (currentTime - rateLimiters[userId].lastRequestTime) / 1000; // Calculate elapsed time in seconds

    if (elapsedTime < 1) { // If less than a second has passed
        if (rateLimiters[userId].requestCount >= requestLimit) {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }
        rateLimiters[userId].requestCount++;
    } else {
        // Reset the request count and update the last request time
        rateLimiters[userId].requestCount = 1;
        rateLimiters[userId].lastRequestTime = currentTime;
    }

    // Log the API usage
    const apiUsage = new ApiUsage({
        user: user._id,
        apiEndpoint: req.originalUrl,
        plan: user.plan._id
    });
    await apiUsage.save();

    next(); // Proceed to the next middleware or route handler
}

module.exports = rateLimiter;
