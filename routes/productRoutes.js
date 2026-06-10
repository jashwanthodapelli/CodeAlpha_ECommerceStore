const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper to read products from JSON file
async function readProducts() {
  try {
    const data = await fs.readFile(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    return [];
  }
}

// GET /api/products
// Optional query params: category, search
router.get('/products', async (req, res) => {
  try {
    let products = await readProducts();
    const { category, search } = req.query;

    // Filter by category
    if (category && category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by search query (case-insensitive name or description match)
    if (search) {
      const query = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve products.' });
  }
});

// GET /api/product/:id
router.get('/product/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Fetch product detail error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve product details.' });
  }
});

module.exports = router;
