


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    productId: String,
    productName: String,
    cost: Number,
    category: { type: String, default: null },
    subcategory: { type: String, default: null },
    description: { type: String, default: null },
    brandName: { type: String, default: null },
    date: { type: Date, default: null },
    productStatus: { type: String, default: 'Null' },
    update: { type: Boolean, default: false },
    productCode: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
