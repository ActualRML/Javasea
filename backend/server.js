const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./routes/user"); 
const productRoutes = require("./routes/products"); 
const categoryRoutes = require("./routes/category"); 
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payment");
const shippingRoutes = require("./routes/shipping");

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes); 
app.use("/shippings", shippingRoutes);


// Port dan cek Server
app.get("/", (req, res) => {
  res.send("Server is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
