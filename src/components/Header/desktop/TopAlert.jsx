// src/components/header/TopAlert.jsx
import { Link } from "react-router-dom";

export default function TopAlert() {
  return (
    <div className="alert bg-primary text-center font-size-1 py-2 text-white rounded-0 mb-0 sticky-top">
       Hasta <strong>12 cuotas sin interés</strong> y <strong>25% OFF</strong> en productos seleccionados. <Link to="#discoutnSection" className="text-white text-decoration-underline">Ver productos</Link>
    </div>
    
  );
}