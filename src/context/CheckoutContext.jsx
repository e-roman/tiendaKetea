import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [checkoutData, setCheckoutData] = useState({
    contact: {
      email: "",
      newsletter: false,
    },
    billing: {
      name: "",
      lastName: "",
      phone: "",
      street: "",
      number: "",
      apartment: "",
    },
    shippingAddress: {
      street: "",
      number: "",
      zip: "",
      province: "",
      city: "",
      type: "",
      floor: "",   // ← agregar esto
    }
  });

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);