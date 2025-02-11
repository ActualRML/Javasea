import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProductList from "../pages/products/ProductList";
import ProductDetail from "../pages/products/ProductDetail";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Profile from "../pages/user/Profile";
import Orders from "../pages/user/Orders";
import Dashboard from "../pages/seller/Dashboard";
import SellerProducts from "../pages/seller/Products";
import SellerOrders from "../pages/seller/Orders";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/seller/dashboard" element={<Dashboard />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
