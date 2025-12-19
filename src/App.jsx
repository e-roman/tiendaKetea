// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";


import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SidebarCart from "../components/SidebarCart";
import { FloatingAlertProvider } from "../src/context/FloatingAlertContext";
import AlertFloating from "../components/AlertFloating";
import Login from "../components/Modals/LoginModal";
import SupportChat from "../components/SupportChat";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import CheckoutPayment from "../pages/checkout/CheckoutPayment";
import ProductPage from "../pages/Product";
import SearchResults from "../pages/SearchResults";
import MyProfile from "../pages/Profile";
import NovedadesPage from "../pages/Novedades";
import DescuentosPage from "../pages/Descuentos";

const HIDE_COMPONENTS_ROUTES = [
  "/cart",
  "/checkout",
  "/checkout/payment",
];

export default function App() {
const location = useLocation();

  const hideComponent = HIDE_COMPONENTS_ROUTES.includes(location.pathname);


  return (
    <FloatingAlertProvider>
      {!hideComponent && <Header />}

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
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
        <Route path="/buscar/:query" element={<SearchResults />} />
        <Route path="/pages/Profile" element={<MyProfile />} />
      </Routes>

       {!hideComponent && <Footer />}
      <Login />
      <SupportChat />
    </FloatingAlertProvider>
  );
}
