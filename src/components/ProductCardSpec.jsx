import { getCardSpec } from "@/data/productDetails";

// Dato técnico destacado bajo el título de la card (ej. "Ciclo: 2 horas")
export default function ProductCardSpec({ product, className = "" }) {
  const spec = getCardSpec(product);
  if (!spec) return null;

  return (
    <p className={`product-card-spec mb-0 ${className}`}>
      {spec.label}: {spec.value}
    </p>
  );
}
