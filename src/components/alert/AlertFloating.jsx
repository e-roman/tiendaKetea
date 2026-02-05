import React from "react";
import { useFloatingAlert } from "@/context/FloatingAlertContext";

export default function AlertFloating() {
  const { alert, hideAlert } = useFloatingAlert();

  if (!alert.visible || !alert.product) return null;

  const { product, action } = alert;

  const formatPrice = (value) =>
    value ? value.toLocaleString("es-AR") : "0";

  return (
    <div className="alert-floating-box border position-fixed">
      <button
        type="button"
        className="alert-close-btn"
        onClick={hideAlert}
      >
        <i class="bi bi-x"></i>

      </button>

      <div className="d-flex align-items-center gap-2">
        <img src={product.image} alt={product.title} />

        <div className="flex-grow-1">
          <p className="status">
            {action === "cart" && "Agregaste el producto"}
            {action === "favorite-add" && "Agregaste el producto"}
            {action === "favorite-remove" && "Eliminaste el producto"}
          </p>

          <p className="alert-title mb-2 text-dark">
            {product.title}
          </p>

          <p className="alert-price text-dark mb-0">
            ${formatPrice(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
