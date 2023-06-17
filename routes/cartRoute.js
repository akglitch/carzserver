const express = require('express');
const router = express.Router();
const cartcon = require('../controllers/cartController')




router.post('/cart', cartcon.addItemToCart);



router.get('/carts', cartcon.getCart);



router.put('/cart/:cartItemId', cartcon.updateCartItemQuantity);



router.delete('/cart/:cartItemId', cartcon.removeItemFromCart);



router.route('/cart/:cart_id')
.get(cartcon.getCart)
.get(cartcon.addItemToCart)
.patch(cartcon.updateCartItemQuantity)
.delete(cartcon.removeItemFromCart);

module.exports = router;