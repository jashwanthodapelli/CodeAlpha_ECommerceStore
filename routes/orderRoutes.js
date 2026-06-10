const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

const ordersFilePath = path.join(__dirname, '../data/orders.json');

// Helper to read orders
async function readOrders() {
  try {
    const data = await fs.readFile(ordersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to write orders
async function writeOrders(orders) {
  await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
}

// GET /api/orders (Protected)
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const allOrders = await readOrders();
    
    // Filter orders belonging to the authenticated user
    const userOrders = allOrders.filter(
      order => order.customer.email.toLowerCase() === req.user.email.toLowerCase()
    );

    res.status(200).json({ success: true, orders: userOrders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve order history.' });
  }
});

// POST /api/checkout (Protected)
router.post('/checkout', authMiddleware, async (req, res) => {
  try {
    const { name, email, address, phone, paymentMethod, items, total } = req.body;

    if (!name || !email || !address || !phone || !paymentMethod || !items || !items.length) {
      return res.status(400).json({ success: false, message: 'Please provide all checkout details and cart items.' });
    }

    const orders = await readOrders();

    // Generate a random 5-digit number for order ID (e.g. ORD10254)
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ORD${randomNum}`;

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer: {
        name,
        email: email.toLowerCase(),
        address,
        phone
      },
      items,
      total: Number(total),
      paymentMethod,
      status: 'Delivered' // Required to always be "Delivered"
    };

    orders.unshift(newOrder); // Add to the beginning of orders array
    await writeOrders(orders);

    res.status(201).json({
      success: true,
      message: 'Order Placed Successfully ✅',
      orderId: orderId,
      order: newOrder
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ success: false, message: 'Fulfillment process failed.' });
  }
});

module.exports = router;
