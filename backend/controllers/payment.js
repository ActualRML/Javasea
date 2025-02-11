const { sequelize, Order, Payment, PaymentHistory } = require("../models");

// 🔹 Buat Payment baru
exports.createPayment = async (req, res) => {
  try {
    const { order_id, payment_method, amount } = req.body;

    // Cek apakah Order ID valid
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Simpan Payment ke database
    const payment = await Payment.create({
      order_id,
      payment_method,
      amount,
      payment_status: "pending", 
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔹 Ambil Payment berdasarkan Order ID
exports.getPaymentByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    const payment = await Payment.findOne({
      where: { order_id },
      attributes: ["payment_id", "order_id", "payment_method", "amount", "payment_status", "created_at"],
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔹 Update Status Payment & Catat History
exports.updatePaymentStatus = async (req, res) => {
  const { payment_id, new_status } = req.body; 
  
  const t = await sequelize.transaction();
  try {
    // Ambil data pembayaran sebelum di-update
    const payment = await Payment.findOne({
      where: { payment_id }
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const previousStatus = payment.payment_status || "pending"; 
    // Update payment status
    await Payment.update(
      { payment_status: new_status },
      { where: { payment_id }, transaction: t }
    );

    // Simpan history perubahan status pembayaran
    await PaymentHistory.create({
      payment_id: payment.payment_id,
      previous_status: previousStatus,
      new_status: new_status, 
      changed_at: new Date(),
      changed_by: "system"
    }, { transaction: t });

    // Commit transaksi
    await t.commit();
    
    res.json({ message: "Payment status updated successfully" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Ambil Riwayat Payment
exports.getPaymentHistory = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const histories = await PaymentHistory.findAll({
      where: { payment_id },
      order: [["changed_at", "DESC"]],
    });

    res.status(200).json(histories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
