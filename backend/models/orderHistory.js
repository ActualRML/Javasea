"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderHistory extends Model {
    static associate(models) {
      OrderHistory.belongsTo(models.Order, { foreignKey: "order_id" });
    }
  }

  OrderHistory.init(
    {
      history_id: {
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
      previous_status: {
        type: DataTypes.ENUM("pending", "paid", "shipped", "completed", "canceled"),
        allowNull: false,
      },
      new_status: {
        type: DataTypes.ENUM("pending", "paid", "shipped", "completed", "canceled"),
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
      modelName: "OrderHistory",
      tableName: "order_histories",
      timestamps: false, 
      underscored: true,
    }
  );

  return OrderHistory;
};
