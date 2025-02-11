"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    static associate(models) {
      // Relasi ke ShippingHistory (One-to-Many: Satu Shipping bisa punya banyak ShippingHistory)
      Shipping.hasMany(models.ShippingHistory, { foreignKey: "shipping_id" });

      // Relasi ke Order (Many-to-One: Banyak Shipping bisa punya satu Order)
      Shipping.belongsTo(models.Order, { foreignKey: "order_id" });
    }
  }

  Shipping.init(
    {
      shipping_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",  // Nama tabel yang sesuai di database, pastikan ini benar
          key: "order_id",  // Kolom yang sesuai di tabel "Orders"
        },
      },
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      shipping_status: {
        type: DataTypes.ENUM(
            "pending", 
            "processed", 
            "shipped", 
            "out_for_delivery", 
            "delivered", 
            "canceled"
        ),
        allowNull: false,
        defaultValue: "pending"
      },
      tracking_number: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true, 
      },
    },
    {
      sequelize,
      modelName: "Shipping",
      tableName: "shippings", // Pastikan tabel "shippings" ada di database
      timestamps: false, 
      underscored: true, 
    }
  );

  return Shipping;
};
