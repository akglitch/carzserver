const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');
const carController = require('../controllers/carController');
const orderController = require('../controllers/orderController');
const cartController = require('../controllers/cartController');
const paymentController = require('../controllers/paymentController');


// User Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
// ...



// Order Routes
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);
// ...



// Payment Routes
router.post('/payment', paymentController.processPayment);
router.get('/payment/:id', paymentController.getPaymentReceipt);
// ...

module.exports =  router;
