

// Backend: routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

router.get('/productsToBeUpdated/:adminId', async (req, res) => {
    const { adminId } = req.params;

    // console.log('Received adminId:', adminId);
  
    try {
     
      const count = await Product.countDocuments({ productId: adminId, update: false });

    //   console.log('Count:', count);
  
      res.json({ count });
    } catch (error) {
      console.error('Error fetching count of products to be updated:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/products/:adminId', async (req, res) => {
    const { adminId } = req.params;

    try {
      
        const products = await Product.find({  productId: adminId });
        // console.log(products)

        res.json(products);
    } catch (error) {
        console.error('Error fetching product list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/productDetails/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
   
        const product = await Product.findOne({ productId });

       
        if (product) {
            const { image, productName, cost } = product;
            res.json({ productId, image, productName, cost });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;


