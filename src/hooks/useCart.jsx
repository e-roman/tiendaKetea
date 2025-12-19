import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const SHIPPING_COSTS = {
  standard: 0,
  express: 25500,
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [shipping, setShipping] = useState(() => {
    return localStorage.getItem("shipping") || "standard";
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shipping", shipping);
  }, [shipping]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((item) => item.id !== productId));

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        shipping,
        shippingCost: SHIPPING_COSTS[shipping],
        setShipping,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
