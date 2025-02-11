"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class PaymentHistory extends Model {
    static associate(models) {
      // Relasi ke Payment (Many-to-One)
      PaymentHistory.belongsTo(models.Payment, { foreignKey: "payment_id" });
    }
  }

  PaymentHistory.init(
    {
      history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      previous_status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        allowNull: false,
      },
      new_status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        allowNull: false,
      },
      changed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      changed_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "system",
      },
    },
    {
      sequelize,
      modelName: "PaymentHistory",
      tableName: "payment_histories",
      timestamps: false,
      underscored: true,
    }
  );

  return PaymentHistory;
};
