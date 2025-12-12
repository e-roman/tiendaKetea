import React from "react";
import { useFloatingAlert } from "../src/context/FloatingAlertContext";

export default function AlertFloating() {
  const context = useFloatingAlert();
  if (!context) return null;

  const { alert } = context;
  if (!alert.visible) return null;

  return (
    <div
      className={`alert-floating alert alert-${alert.type}`}
      style={{
        position: "fixed",
        top: "4%",
        left:"inherit",
        right: "2%",
        transform: "translateX(0%)",
        zIndex: 9999999,
      }}
    >
      {alert.message}
    </div>
  );
}
