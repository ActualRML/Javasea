// models/category.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Relasi antara Category dan Product (One-to-Many)
      Category.hasMany(models.Product, { foreignKey: "categoryId" });
    }
  }

  // Menambahkan kolom sesuai dengan kebutuhan
  Category.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      description: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,  
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,  
        allowNull: false,
      },
      
    },
    {
      sequelize,
      modelName: "Category",
      timestamps: true, 
    }
  );
  return Category;
};
