const express = require("express");
const router = express.Router();
const upload = require("../lib/multer"); 
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize')
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    activateProduct,
    deactivateProduct
 } = require("../controllers/products");

// Endpoint
router.post("/", authenticate, authorize, upload.single("image"), createProduct); // Create
router.get('/', authenticate, getAllProducts); // Get All
router.get('/:productId', authenticate, getProductById); // Get by Id
router.put('/:productId', authenticate, authorize, updateProduct); // Update
router.put('/activate/:productId', authenticate, authorize, activateProduct); // Activate
router.put('/deactivate/:productId', authenticate, authorize, deactivateProduct); // Deactivate

module.exports = router;
