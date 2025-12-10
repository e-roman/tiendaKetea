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
        top: "10%",
        left:"inherit",
        right: "0%",
        transform: "translateX(-50%)",
        zIndex: 9999999,
      }}
    >
      {alert.message}
    </div>
  );
}
