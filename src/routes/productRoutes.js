const express = require('express');
const router = express.Router();
const upload = require('../config/s3');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// List products
router.get('/', getProducts);

// Get single product
router.get('/:id', getProductById);

// Create product with image upload (field name: images)
router.post('/', upload.array('images', 5), createProduct);

// Update product (can add images)
router.put('/:id', upload.array('images', 5), updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

module.exports = router;
