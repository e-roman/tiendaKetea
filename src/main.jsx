import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import "./App.css";
import "./Styles.css";
import './ketea-tokens.css'  

import { CartProvider } from "./hooks/useCart.jsx";
import { FavoritesProvider } from "./hooks/useFavorites.jsx";
import { FloatingAlertProvider } from "./context/FloatingAlertContext";
import { AuthProvider } from "./context/AuthContext"; 


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <CartProvider>
          <FloatingAlertProvider>

            <AuthProvider>   
              <App />
            </AuthProvider>

          </FloatingAlertProvider>
        </CartProvider>
      </FavoritesProvider>

    </BrowserRouter>
  </StrictMode>
);
