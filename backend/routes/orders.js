const express = require("express");
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getOrderHistory
} = require("../controllers/orders");

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:orderId", updateOrderStatus);
router.get("/:orderId/history", getOrderHistory);

module.exports = router;
