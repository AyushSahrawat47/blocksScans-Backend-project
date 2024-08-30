const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const rateLimiter = require('./middleware/rateLimiter'); // Import the rate limiter middleware

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/plans', require('./routes/plans'));

// API Key Route
app.use('/api/keys',rateLimiter, require('./routes/keys')); 

//Stats route
app.use('/api/stats', require('./routes/stats')); 



app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`)
  })