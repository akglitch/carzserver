// Import dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToDB } = require('./db/dbconnection');

// Create the Express application
const app = express();
const port = 3000; // Set your desired port number

// Middleware configuration
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(
  express.urlencoded({extended : true})
);

// MongoDB connection
connectToDB();

// Use routes
const carRouter = require('./routes/carRoute');
app.use('/', carRouter);

const cartRouter = require('./routes/cartRoute');
app.use('/cart', cartRouter);

const orderRouter = require('./routes/orderRoute');
app.use('/orders', orderRouter);

const userRouter = require('./routes/userRoute');
app.use('/', userRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
