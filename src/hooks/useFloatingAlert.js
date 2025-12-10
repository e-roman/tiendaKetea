import { useState } from "react";

export function useFloatingAlert() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const showAlert = (msg, alertType = "success") => {
    setMessage(msg);
    setType(alertType);
  };

  return { message, type, showAlert };
}
