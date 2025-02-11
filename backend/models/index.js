const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "root",
  database: "javasea_mp",
});

// Import models
const User = require("./user")(sequelize, DataTypes);
const Product = require("./products")(sequelize, DataTypes);
const Category = require("./category")(sequelize, DataTypes);
const Cart = require("./cart")(sequelize, DataTypes);
const CartItem = require("./cartItems")(sequelize, DataTypes);
const Order = require("./orders")(sequelize, DataTypes);
const OrderItem = require("./orderItems")(sequelize, DataTypes);
const Payment = require("./payments")(sequelize, DataTypes);
const Shipping = require("./shipping")(sequelize, DataTypes);
const OrderHistory = require('./orderHistory')(sequelize, DataTypes);  
const PaymentHistory = require('./paymentHistory')(sequelize, DataTypes);  
const ShippingHistory = require('./shippingHistory')(sequelize, DataTypes);  

// Menyimpan model ke dalam object models
const models = {
  sequelize,
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Payment,
  Shipping,
  ShippingHistory, 
  OrderHistory,
  PaymentHistory
};

// Loop untuk inisialisasi relasi di setiap model
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
