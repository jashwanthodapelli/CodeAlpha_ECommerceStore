const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

const cartsFilePath = path.join(__dirname, '../data/carts.json');

// Helper to read all carts
async function readCarts() {
  try {
    const data = await fs.readFile(cartsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty object
    return {};
  }
}

// Helper to write all carts
async function writeCarts(carts) {
  await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2), 'utf8');
}

// GET /api/cart (Protected)
router.get('/cart', authMiddleware, async (req, res) => {
  try {
    const carts = await readCarts();
    const userCart = carts[req.user.email.toLowerCase()] || [];
    res.status(200).json({ success: true, cart: userCart });
  } catch (error) {
    console.error('Fetch cart error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve cart items.' });
  }
});

// POST /api/cart (Protected)
router.post('/cart', authMiddleware, async (req, res) => {
  try {
    const { cart } = req.body;
    
    if (!Array.isArray(cart)) {
      return res.status(400).json({ success: false, message: 'Cart data must be an array.' });
    }

    const carts = await readCarts();
    carts[req.user.email.toLowerCase()] = cart;
    await writeCarts(carts);

    res.status(200).json({ success: true, message: 'Cart synchronized successfully.' });
  } catch (error) {
    console.error('Sync cart error:', error);
    res.status(500).json({ success: false, message: 'Failed to sync cart data.' });
  }
});

module.exports = router;
