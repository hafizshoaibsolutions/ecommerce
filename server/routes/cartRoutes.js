// routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { authVerifyMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/add', authVerifyMiddleware, addToCart);
router.get('/', authVerifyMiddleware, getCart);
router.put('/update', authVerifyMiddleware, updateCartItem);
router.delete('/remove/:itemId', authVerifyMiddleware, removeFromCart);

module.exports = router;