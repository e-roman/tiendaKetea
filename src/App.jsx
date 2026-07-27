import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import SidebarCart from "@/components/SidebarCart";
import { FloatingAlertProvider } from "@/context/FloatingAlertContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import AlertFloating from "@/components/alert/AlertFloating";
import Login from "@/components/Modals/LoginModal";
import LogoutModal from "@/components/Modals/LogoutModal";
import SupportChat from "@/components/SupportChat";

import ScrollToTop from "@/components/ScrollToTop";
import RouteSkeleton from "@/components/skeletons/RouteSkeleton";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import CheckoutShipping from "../pages/checkout/CheckoutShipping";
import CheckoutPayment from "../pages/checkout/CheckoutPayment";
import OrderComplete from "../pages/checkout/OrderComplete";

import ProductPage from "../pages/Product";
import SearchResults from "../pages/SearchResults";
import MyProfile from "../pages/Profile";
import NovedadesPage from "../pages/Novedades";
import DescuentosPage from "../pages/Descuentos";
import MasVendidoPage from "../pages/MasVendido";

const HIDE_COMPONENTS_ROUTES = [
  "/checkout",
  "/checkout/entrega",
  "/checkout/pago",
  "/pago-realizado",
];

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const hideComponent = HIDE_COMPONENTS_ROUTES.includes(location.pathname);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <FloatingAlertProvider>
      <CheckoutProvider>
        <ScrollToTop />

        {!hideComponent && (
          <Header setShowLogoutModal={setShowLogoutModal} />
        )}

        {/* Overlay global */}
        {megaOpen && (
          <div
            className="layout-overlay"
            onClick={() => setMegaOpen(false)}
          />
        )}

        <AlertFloating />
        <SidebarCart />

        {loading ? (
          <RouteSkeleton pathname={location.pathname} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/novedades" element={<NovedadesPage />} />
            <Route path="/descuentos" element={<DescuentosPage />} />
            <Route path="/Mas-vendido" element={<MasVendidoPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />

            {/* Checkout flow */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/entrega" element={<CheckoutShipping />} />
            <Route path="/checkout/pago" element={<CheckoutPayment />} />
            <Route path="/pago-realizado" element={<OrderComplete />} />

            <Route path="/buscar/:query" element={<SearchResults />} />
            <Route path="/pages/Profile" element={<MyProfile />} />
          </Routes>
        )}

        {!hideComponent && <Footer />}

        <Login />

        {showLogoutModal && (
          <LogoutModal
            show={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
          />
        )}

        <SupportChat />
      </CheckoutProvider>
    </FloatingAlertProvider>
  );
}