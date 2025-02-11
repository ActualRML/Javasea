module.exports = (sequelize, DataTypes) => {
  const PaymentHistory = sequelize.define("PaymentHistory", {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previous_status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false
    },
    new_status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false
    },
    changed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    changed_by: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "system"
    }
  }, {
    tableName: "payment_histories",
    timestamps: false
  });

  return PaymentHistory;
};
