// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SidebarCart from "../components/SidebarCart";
import { FloatingAlertProvider } from "../src/context/FloatingAlertContext";
import AlertFloating from "../components/AlertFloating";
import Login from "../components/Modals/Login";
import SupportChat from "../components/SupportChat";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductPage from "../pages/Product";
import SearchResults from "../pages/SearchResults";
import MyProfile from "../pages/Profile";
import NovedadesPage from "../pages/Novedades";
import DescuentosPage from "../pages/Descuentos";

export default function App() {
  return (
    <FloatingAlertProvider>
      <Header />

      <AlertFloating />
      <SidebarCart />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/novedades" element={<NovedadesPage />} />

        <Route path="/descuentos" element={<DescuentosPage />} />

        {/* Página de producto por SLUG (corregido) */}
        <Route path="/product/:slug" element={<ProductPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/buscar/:query" element={<SearchResults />} />
        <Route path="/pages/Profile" element={<MyProfile />} />
      </Routes>

      <Footer />
      <Login />
      <SupportChat />
    </FloatingAlertProvider>
  );
}
