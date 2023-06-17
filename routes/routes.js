const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const userController = require('../controllers/userController');
const carController = require('../controllers/carController');
const orderController = require('../controllers/orderController');
const cartController = require('../controllers/cartController');
const paymentController = require('../controllers/paymentController');

// User Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
// ...

// Car Routes
router.get('/cars', carController.getCars);
router.get('/cars/:id', carController.getCarById);
router.post('/cars', authMiddleware, carController.createCar);
router.put('/cars/:id', authMiddleware, carController.updateCar);
router.delete('/cars/:id', authMiddleware, carController.deleteCar);
// ...

// Order Routes
router.post('/orders', authMiddleware, orderController.createOrder);
router.get('/orders', authMiddleware, orderController.getOrders);
router.get('/orders/:id', authMiddleware, orderController.getOrderById);
// ...

// Cart Routes
router.post('/cart', authMiddleware, cartController.addItemToCart);
router.get('/cart', authMiddleware, cartController.getCart);
router.put('/cart/:cartItemId', authMiddleware, cartController.updateCartItemQuantity);
router.delete('/cart/:cartItemId', authMiddleware, cartController.removeItemFromCart);
// ...

// Payment Routes
router.post('/payment', authMiddleware, paymentController.processPayment);
router.get('/payment/:id', authMiddleware, paymentController.getPaymentReceipt);
// ...

module.exports = router;
