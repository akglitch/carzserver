const Cart = require('../models/Cart');

async function addItemToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req.user; // Assuming you have user authentication and req.user contains the user ID

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      // Update the quantity if the product already exists
      existingItem.quantity += quantity;
    } else {
      // Add the product as a new item if it doesn't exist
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add item to cart', details: error.message });
  }
}

async function getCart(req, res) {
  try {
    const { userId } = req.user; // Assuming you have user authentication and req.user contains the user ID

    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');

    if (!cart) {
      return res.status(404).json({ success: false, error: 'Cart not found' });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch cart', details: error.message });
  }
}

async function updateCartItemQuantity(req, res) {
  try {
    const { cartItemId, quantity } = req.body;
    const { userId } = req.user; // Assuming you have user authentication and req.user contains the user ID

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: 'Cart not found' });
    }

    // Find the item in the cart by its ID
    const item = cart.items.find(item => item._id.toString() === cartItemId);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found in cart' });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update cart item quantity', details: error.message });
  }
}

async function removeItemFromCart(req, res) {
  try {
    const { cartItemId } = req.params;
    const { userId } = req.user; // Assuming you have user authentication and req.user contains the user ID

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: 'Cart not found' });
    }

    // Find the item in the cart by its ID and remove it
    cart.items = cart.items.filter(item => item._id.toString() !== cartItemId);

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to remove item from cart', details: error.message });
  }
}

module.exports = {
  addItemToCart,
  getCart,
  updateCartItemQuantity,
  removeItemFromCart
};
