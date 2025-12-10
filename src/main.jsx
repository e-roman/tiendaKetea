import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import "./Styles.css";

import { CartProvider } from "./hooks/useCart.jsx";
import { FavoritesProvider } from "./hooks/useFavorites.jsx";
import { FloatingAlertProvider } from "./context/FloatingAlertContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <CartProvider>
          {/* <ScrollToTop /> */}
          <FloatingAlertProvider>
            <App />
          </FloatingAlertProvider>
        </CartProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);




