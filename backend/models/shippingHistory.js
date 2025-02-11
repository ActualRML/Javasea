"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ShippingHistory extends Model {
    static associate(models) {
      ShippingHistory.belongsTo(models.Shipping, { foreignKey: "shipping_id" });
    }
  }

  ShippingHistory.init(
    {
      history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shipping_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Shippings",
          key: "shipping_id",
        },
      },
      previous_status: {
        type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
        allowNull: false,
      },
      new_status: {
        type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
        allowNull: false,
      },
      changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      changed_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "system",
      },
    },
    {
      sequelize,
      modelName: "ShippingHistory",
      tableName: "shipping_histories",
      timestamps: false,
      underscored: true,
    }
  );

  return ShippingHistory;
};
