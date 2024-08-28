const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/plans', require('./routes/plans'));

// API Key Route
app.use('/api/keys', require('./routes/keys')); // Assuming you create a keys route for API key management



app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`)
  })