// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectToDB } = require('./db/dbconnection');
const bcrypt = require('bcrypt')

// Create the Express application
const app = express();
const port = 3000; // Set your desired port number

// Middleware configuration
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// MongoDB connection
connectToDB();

// Use routes
const carRouter = require('./routes/carRoute');
app.use('/', carRouter)

const cartRouter = require('./routes/cartRoute');
app.use('/cart',cartRouter)

const orderRouter = require('./routes/orderRoute');
app.use('/orders',orderRouter)




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
