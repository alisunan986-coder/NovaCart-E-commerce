const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

router.use(protect);

router.get('/', getCart);
router.post('/items', addToCart);
router.delete('/items/:productId', removeFromCart);

module.exports = router;
