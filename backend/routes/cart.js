const express = require("express");
const router = express.Router();
const {
    getCartByUser,
    addToCart,
    removeFromCart,
    clearCart } = require("../controllers/cart");

router.post("/", addToCart);
router.get("/:user_id", getCartByUser);
router.delete("/:cartItemId", removeFromCart);
router.delete("/clear/:userId", clearCart);

module.exports = router;
