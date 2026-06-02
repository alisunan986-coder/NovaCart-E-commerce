const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createPaymentIntent, webhookHandler, simulatePayment } = require('../controllers/paymentController');

// Create payment intent for an order (protected)
router.post('/create-payment-intent', protect, createPaymentIntent);

// Simulate payment for local/dev testing (protected)
router.post('/simulate', protect, express.json(), simulatePayment);

// Stripe webhook - needs raw body, set in route
router.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

module.exports = router;
