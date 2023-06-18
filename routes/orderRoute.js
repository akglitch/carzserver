const express = require('express');
const ordercon = require('../controllers/orderController');
const router = express.router()



router.post('/orders', ordercon.createOrder);


router.get('/orders', ordercon.getOrders);


router.get('/orders/:id', ordercon.getOrderById);


router.route('/car/:orders_id')
.get(ordercon.createOrder)
.get(ordercon.getOrderById)
.patch(ordercon.getOrders)


module.exports = router;