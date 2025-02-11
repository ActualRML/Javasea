const { Cart, CartItem, Product } = require("../models");

exports.getCartByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const cart = await Cart.findOne({
      where: { user_id: user_id },
      include: [
        {
          model: CartItem,
          include: [{ model: Product }],
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }

    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.cart_id, product_id: productId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await CartItem.create({
        cart_id: cart.cart_id,
        product_id: productId,
        quantity,
      });
    }

    res.status(201).json({ message: "Product added to cart" });

  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan produk ke cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.destroy();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await CartItem.destroy({ where: { cart_id: cart.cart_id } });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
