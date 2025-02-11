const { Shipping, ShippingHistory, Order } = require("../models");

// Ambil semua pengiriman
exports.getAllShippings = async (req, res) => {
  try {
    const shippings = await Shipping.findAll({ include: Order });
    res.json({ shippings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil pengiriman berdasarkan ID
exports.getShippingById = async (req, res) => {
  try {
    const { id } = req.params;
    const shipping = await Shipping.findByPk(id, { include: Order });

    if (!shipping) {
      return res.status(404).json({ message: "Shipping not found" });
    }

    res.json({ shipping });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buat pengiriman baru
exports.createShipping = async (req, res) => {
  try {
    const { order_id, shipping_address, shipping_status, tracking_number } = req.body;

    // Simpan shipping ke database
    const shipping = await Shipping.create({
      order_id,
      shipping_address,
      shipping_status,
      tracking_number,
    });

    // Simpan history pertama kali
    await ShippingHistory.create({
      shipping_id: shipping.id,
      status: shipping_status,
    });

    res.status(201).json({ message: "Shipping created", shipping });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status pengiriman
exports.updateShipping = async (req, res) => {
  try {
      const { id } = req.params;
      const { shipping_status, changed_by = "system" } = req.body;

      // Cari data shipping berdasarkan ID
      const shipping = await Shipping.findByPk(id);
      if (!shipping) {
          return res.status(404).json({ message: "Shipping not found" });
      }

      // Cek apakah status baru sama dengan status lama
      if (shipping.shipping_status === shipping_status) {
          return res.status(400).json({ message: "Shipping status is already " + shipping_status });
      }

      // Simpan history perubahan status
      await ShippingHistory.create({
          shipping_id: id,
          previous_status: shipping.shipping_status,
          new_status: shipping_status,
          changed_by,
      });

      // Simpan perubahan status
      shipping.shipping_status = shipping_status;
      await shipping.save();

      res.json({ message: "Shipping updated successfully", shipping });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
};

// Hapus pengiriman
exports.deleteShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const shipping = await Shipping.findByPk(id);

    if (!shipping) {
      return res.status(404).json({ message: "Shipping not found" });
    }

    await shipping.destroy();
    res.json({ message: "Shipping deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil history pengiriman berdasarkan shipping_id
exports.getShippingHistory = async (req, res) => {
  try {
    // Ambil shippingId dari params 
    const { shippingId } = req.params; 

    if (!shippingId) {
      return res.status(400).json({ error: "Missing shipping_id" });
    }

    const shippingHistories = await ShippingHistory.findAll({
      where: { shipping_id: shippingId },
      attributes: ["history_id", "shipping_id", "previous_status", "new_status", "changed_at", "changed_by"],
      order: [["changed_at", "DESC"]],
    });

    res.json(shippingHistories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

