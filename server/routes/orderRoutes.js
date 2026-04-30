// routes/orderRoutes.js
const express = require('express');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authVerifyMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authVerifyMiddleware, createOrder);
router.get('/my-orders', authVerifyMiddleware, getUserOrders);
router.get('/all', authVerifyMiddleware, getAllOrders); // admin only, add role check later
router.put('/:id/status', authVerifyMiddleware, updateOrderStatus); // admin only

module.exports = router;