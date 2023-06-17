const Payment = require('../models/Payment');
const Order = require('../models/Order');

async function processPayment(req, res) {
  try {
    const { orderId, amount, paymentMethod } = req.body;

    // Check if the order exists
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Perform payment processing logic here
    // This can include interacting with payment gateway APIs, validating payment details, etc.

    // For the sake of example, let's assume the payment is successful and generate a payment receipt
    const paymentReceipt = await Payment.create({ orderId, amount, paymentMethod });

    // Update the order status to 'paid'
    order.status = 'paid';
    await order.save();

    res.status(200).json({ success: true, data: paymentReceipt });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid order ID' });
    }
    res.status(500).json({ success: false, error: 'Failed to process payment', details: error.message });
  }
}

async function getPaymentReceipt(req, res) {
  try {
    const paymentId = req.params.id;
    const paymentReceipt = await Payment.findById(paymentId);

    if (!paymentReceipt) {
      return res.status(404).json({ success: false, error: 'Payment receipt not found' });
    }

    res.status(200).json({ success: true, data: paymentReceipt });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid payment receipt ID' });
    }
    res.status(500).json({ success: false, error: 'Failed to fetch payment receipt', details: error.message });
  }
}

module.exports = {
  processPayment,
  getPaymentReceipt
};
