// src/context/FloatingAlertContext.jsx
import { createContext, useContext, useState } from "react";

const FloatingAlertContext = createContext();

export function FloatingAlertProvider({ children }) {
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showAlert = (message, type = "success", duration = 3000) => {
    setAlert({ visible: true, message, type });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  return (
    <FloatingAlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </FloatingAlertContext.Provider>
  );
}

export function useFloatingAlert() {
  return useContext(FloatingAlertContext);
}
