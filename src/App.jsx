import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SidebarCart from "../components/SidebarCart";
import AlertFloating from "../components/AlertFloating";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductPage from "../pages/Product"; // <-- FALTA IMPORTAR ESTO
import SearchResults from "../pages/SearchResults";

export default function App() {
  return (
    <>
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
      </Routes>

      <Footer />
    </>
  );
}
