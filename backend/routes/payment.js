const express = require("express");
const router = express.Router();
const {
    createPayment,
    getPaymentByOrderId,
    updatePaymentStatus,
    getPaymentHistory
} = require("../controllers/payment");

router.post("/", createPayment); 
router.get("/:order_id", getPaymentByOrderId); 
router.put("/", updatePaymentStatus); 
router.get("/:payment_id/history", getPaymentHistory);

module.exports = router;
