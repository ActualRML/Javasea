const { Order, OrderItem, OrderHistory } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    // Hitung total harga order
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Simpan order ke database
    const order = await Order.create({
      user_id,
      total_amount: totalAmount,
      status: "pending",
    });

    // Simpan order items ke database
    const orderItems = items.map((item) => ({
      order_id: order.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({
      message: "Order berhasil dibuat",
      order,
      orderItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: "items"}],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { order_id: id },
      include: [{ model: OrderItem, as: "items" }],
    });

    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

// 🔹 Update status order dan catat history
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, changed_by = "system" } = req.body;

    // Cari data order berdasarkan ID
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Cek apakah status baru sama dengan status lama
    if (order.status === status) {
      return res.status(400).json({ message: "Order status is already " + status });
    }

    // Simpan history perubahan status
    await OrderHistory.create({
      order_id: orderId,
      previous_status: order.status, // Tambahkan previous_status
      new_status: status, // Tambahkan new_status
      changed_by,
    });

    // Simpan perubahan status di tabel orders
    order.status = status;
    await order.save();

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


// 🔹 Ambil riwayat status order
exports.getOrderHistory = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Validasi jika orderId tidak ada atau tidak valid
    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }
    
    const orderHistories = await OrderHistory.findAll({
      attributes: [
        "history_id",
        "order_id",
        "previous_status",
        "new_status",
        "changed_at",
        "changed_by"
      ],
      where: { order_id: orderId },
      order: [["changed_at", "DESC"]],
    });

    // Jika tidak ada riwayat, kembalikan response kosong
    if (!orderHistories.length) {
      return res.status(404).json({ message: "No order history found" });
    }

    res.status(200).json(orderHistories);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};
