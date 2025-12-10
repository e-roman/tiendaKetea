import { useEffect, useState } from "react";

export default function AlertFloating({ message, type = "success", duration = 1800 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!message) return null;

  const typeClasses = {
    success: "bg-success",
    error: "bg-danger",
    info: "bg-primary",
  };
  const bgClass = typeClasses[type] || "bg-primary";

  return (
    <div
          id="floatingAlert"
      className={`alert ${bgClass} ${visible ? "opacity-100" : "opacity-0"} transition-opacity`}
      style={{ zIndex: 1055, transition: "opacity 0.3s ease-in-out" }}
    >
      {message}
    </div>
  );
}
