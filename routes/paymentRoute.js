const express = require('express');
const paymentcon = require('../controllers/paymentController');
const router = express.router()


router.post('/payment', paymentcon.processPayment);


router.get('/payment/:id', paymentcon.getPaymentReceipt);


router.route('/payment/:orders_id')
.post(paymentcon.processPayment)
.get(paymentcon.getPaymentReceipt);



module.exports = router;