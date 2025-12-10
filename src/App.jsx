// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SidebarCart from "../components/SidebarCart";
import { FloatingAlertProvider } from "../src/context/FloatingAlertContext";
import AlertFloating from "../components/AlertFloating";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductPage from "../pages/Product"; // <-- FALTA IMPORTAR ESTO
import SearchResults from "../pages/SearchResults";
import MyProfile from "../pages/Profile"; // <-- importar el perfil

export default function App() {
  return (
    <>
    <FloatingAlertProvider>
      <Header />

      <AlertFloating />

      <SidebarCart />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Página de detalle de producto */}
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/buscar/:query" element={<SearchResults />} />

         <Route path="/pages/Profile" element={<MyProfile />} />
      </Routes>

      <Footer />
      </FloatingAlertProvider>
    </>
  );
}
