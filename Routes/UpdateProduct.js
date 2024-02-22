
const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');


router.put('/updateProduct/:productCode', async (req, res) => {
  const { productCode } = req.params;
  const updatedProductData = req.body;
  
  try {

    if (req.body.image) {
    
      const base64Image = req.body.image.toString('base64');
      updatedProductData.image = base64Image;
    }

    const updatedProduct = await Product.findOneAndUpdate({ productCode }, updatedProductData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
