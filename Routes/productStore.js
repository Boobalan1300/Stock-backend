const express = require('express');
const multer = require('multer');
const shortid = require('shortid'); 
const router = express.Router();
const Product = require('../Models/Product');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/products', upload.single('image'), async (req, res) => {
    try {
       
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const productCode = shortid.generate();   
        const { productId, productName, cost, category, subcategory, description, brandName, date, productStatus, update } = req.body;
       
        const image = req.file.buffer.toString('base64');

        const newProduct = new Product({
            image,
            productId,
            productName,
            cost,
            category,
            subcategory,
            description,
            brandName,
            date,
            productStatus,
            update,
            productCode 
        });
        await newProduct.save();
        
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
