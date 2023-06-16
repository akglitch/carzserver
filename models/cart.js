const mongoose = require('mongoose');
const { Schema } = mongoose;
const Car = require('./Car');

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
