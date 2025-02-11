const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Relasi ke Order (One-to-Many)
      User.hasMany(models.Order, { foreignKey: "user_id", onDelete: "CASCADE" });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {  
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user_default",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "user",
      },
      created_at: { 
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: { 
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_active: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true, 
    }
  );

  return User;
};
