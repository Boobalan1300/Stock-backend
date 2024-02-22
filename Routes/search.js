


const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

router.get('/searchProducts/:adminId', async (req, res) => {
    const { adminId } = req.params;

    try {

        const products = await Product.find({ productId: adminId }).select('image productName cost category subcategory');

        res.json(products);
    } catch (error) {
        console.error('Error fetching product list for search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/searchProductsByCategory/:adminId/:category', async (req, res) => {
    const { adminId, category } = req.params;

    try {
        const products = await Product.find({ productId: adminId, category }).select('image productName cost category subcategory');

        res.json(products);
    } catch (error) {
        console.error('Error fetching product list for search by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
