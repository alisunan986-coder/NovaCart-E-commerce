const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create a PaymentIntent for an order
const createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.isPaid) return res.status(400).json({ message: 'Order already paid' });

    const amount = Math.round(order.totalPrice * 100); // cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { orderId: order._id.toString() },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('createPaymentIntent error', error);
    res.status(500).json({ message: error.message });
  }
};

// Stripe webhook handler to confirm payments
const webhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const orderId = pi.metadata.orderId;
    try {
      const order = await Order.findById(orderId);
      if (order && !order.isPaid) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = { id: pi.id, status: pi.status };
        await order.save();
      }
    } catch (err) {
      console.error('Error updating order after payment:', err.message);
    }
  }

  res.json({ received: true });
};

// Simulate a payment (dev only) - marks order paid without Stripe
const simulatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.isPaid) return res.status(400).json({ message: 'Order already paid' });

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = { id: `sim_${Date.now()}`, status: 'succeeded', simulated: true };
    await order.save();

    res.json({ message: 'Order marked as paid (simulated)', order });
  } catch (err) {
    console.error('simulatePayment error', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPaymentIntent, webhookHandler, simulatePayment };

