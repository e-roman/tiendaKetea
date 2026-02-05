import { createContext, useContext, useState } from "react";

const FloatingAlertContext = createContext(null);

export function FloatingAlertProvider({ children }) {
  const [alert, setAlert] = useState({
    visible: false,
    action: null,
    product: null,
  });

  const showAlert = ({ product, action }) => {
    setAlert({
      visible: true,
      product,
      action,
    });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const hideAlert = () => {
    setAlert({
      visible: false,
      product: null,
      action: null,
    });
  };

  return (
    <FloatingAlertContext.Provider
      value={{ alert, showAlert, hideAlert }}
    >
      {children}
    </FloatingAlertContext.Provider>
  );
}

export const useFloatingAlert = () => useContext(FloatingAlertContext);
