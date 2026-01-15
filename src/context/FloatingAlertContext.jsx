import { createContext, useContext, useState } from "react";

const FloatingAlertContext = createContext(null);

export function FloatingAlertProvider({ children }) {
  const [alert, setAlert] = useState({
    visible: false,
    type: "success",
    action: null,
    product: null,
  });

  const showAlert = (data) => {
    setAlert({
      visible: true,
      ...data,
    });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  return (
    <FloatingAlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </FloatingAlertContext.Provider>
  );
}

export const useFloatingAlert = () => useContext(FloatingAlertContext);
