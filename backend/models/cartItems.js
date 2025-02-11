"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // CartItem terkait dengan Cart (Many-to-One)
      CartItem.belongsTo(models.Cart, { foreignKey: "cart_id", onDelete: "CASCADE" });

      // CartItem terkait dengan Product (Many-to-One)
      CartItem.belongsTo(models.Product, { foreignKey: "product_id", onDelete: "CASCADE" });
    }
  }


  CartItem.init(
    {
      cart_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "carts", 
          key: "cart_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        defaultValue: 1, 
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "cart_items",
      timestamps: false, 
      underscored: true,
    }
  );

  return CartItem;
};
