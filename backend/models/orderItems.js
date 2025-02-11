"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // Relasi ke Order (Many-to-One)
      OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });

      // Relasi ke Product (Many-to-One)
      OrderItem.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }

  OrderItem.init(
    {
      order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
          key: "order_id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "product_id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "order_items", 
      timestamps: false,
      underscored: true, 
    }
  );

  return OrderItem;
};
