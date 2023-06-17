const Order = require('../models/Order');

async function createOrder(req, res) {
  try {
    const { customerId, products } = req.body;
    const order = await Order.create({ customerId, products });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create order', details: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find().populate('customerId', 'name email');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch orders', details: error.message });
  }
}

async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('customerId', 'name email');
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch order', details: error.message });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid order ID' });
    }
    res.status(500).json({ success: false, error: 'Failed to update order', details: error.message });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};
