"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Cart terkait dengan User (Many-to-One)
      Cart.belongsTo(models.User, { foreignKey: "user_id" });

      // Cart memiliki banyak CartItem (One-to-Many)
      Cart.hasMany(models.CartItem, { foreignKey: "cart_id", onDelete: "CASCADE" });
    }
  }

  Cart.init(
    {
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", 
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      timestamps: false,
      underscored: true,
    }
  );

  return Cart;
};
