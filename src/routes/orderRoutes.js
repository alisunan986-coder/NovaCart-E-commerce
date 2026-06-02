const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { addOrder, addOrderFromCart, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController');

router.use(protect);

router.post('/', addOrder);
router.post('/from-cart', addOrderFromCart);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/pay', updateOrderToPaid);

module.exports = router;
