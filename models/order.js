const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User');
const Car = require('./Car');

const orderSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    default: 'pending',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
