const express = require("express");
const router = express.Router();
const {
    getAllShippings,
    getShippingById,
    createShipping,
    updateShipping,
    deleteShipping,
    getShippingHistory
} = require("../controllers/shipping");

// Endpoint untuk Shipping
router.get("/", getAllShippings); // Get All
router.get("/:id", getShippingById); // Get by Id
router.post("/", createShipping); // Create
router.put("/:id", updateShipping); // Update Status
router.delete("/:id", deleteShipping); // Delete
router.get("/:shippingId/history", getShippingHistory); // Get History

module.exports = router;
