import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SidebarCart from "../components/SidebarCart";
import { FloatingAlertProvider } from "../src/context/FloatingAlertContext";
import AlertFloating from "../components/AlertFloating";
import Login from "../components/Modals/LoginModal";
import SupportChat from "../components/SupportChat";

import ScrollToTop from "../components/ScrollToTop";
import PageLoader from "../components/PageLoader";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import CheckoutPayment from "../pages/checkout/CheckoutPayment";
import OrderComplete from "../pages/checkout/OrderComplete";

import ProductPage from "../pages/Product";
import SearchResults from "../pages/SearchResults";
import MyProfile from "../pages/Profile";
import NovedadesPage from "../pages/Novedades";
import DescuentosPage from "../pages/Descuentos";

const HIDE_COMPONENTS_ROUTES = [
  "/cart",
  "/checkout",
  "/checkout/payment",
  "/order-complete",
];

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

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
      <ScrollToTop />
      <PageLoader visible={loading} />

      {!hideComponent && <Header />}

      <AlertFloating />
      <SidebarCart />

      {!loading && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/descuentos" element={<DescuentosPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/payment" element={<CheckoutPayment />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/buscar/:query" element={<SearchResults />} />
          <Route path="/pages/Profile" element={<MyProfile />} />
        </Routes>
      )}

      {!hideComponent && <Footer />}
      <Login />
      <SupportChat />
    </FloatingAlertProvider>
  );
}
