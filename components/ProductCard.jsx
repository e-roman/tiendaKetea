// src/components/ProductCard.jsx
import { useState, useEffect } from "react";
import { useFavorites } from "../src/hooks/useFavorites";
import { useCart } from "../src/hooks/useCart";
import { useFloatingAlert } from "../src/context/FloatingAlertContext";

export default function ProductCard({ product, openProduct }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, addToCart } = useCart();
  const { showAlert } = useFloatingAlert(); // hook del contexto

  const [inCart, setInCart] = useState(false);
  const isFav = favorites.some((f) => f.id === product.id);

  useEffect(() => {
    setInCart(cart.some((item) => item.id === product.id));
  }, [cart, product.id]);

  const formatPrice = (value) => (value ? value.toLocaleString("es-AR") : "0");

  const handleAddToCart = () => {
    addToCart(product);
    showAlert("Agregaste el producto al carrito", "success");
  };

  const handleToggleFavorite = () => {
    const wasFavorite = isFav;
    toggleFavorite(product);
    showAlert(
      wasFavorite ? "Eliminaste un favorito" : "Agregaste a favoritos",
      "success"
    );
  };

  return (
    <div className="card card-bordered shadow-none text-start h-100">
      <div className="card-pinned">
        <button
          className="p-0 border-0 bg-transparent"
          onClick={() => openProduct(product.id)}
        >
          <img className="card-img-top" src={product.image} alt={product.title} />
        </button>

        <div className="card-pinned-top-end">
          <button
            type="button"
            className="btn-fav btn btn-outline-secondary btn-xs p-3 btn-icon rounded-circle"
            onClick={handleToggleFavorite}
          >
            <i className={isFav ? "bi-heart-fill font-16" : "bi-heart font-16"}></i>
          </button>
        </div>

        {product.envioGratis || !product.stock ? (
          <div className="badge-envio">
            {!product.stock ? (
              <span className="badge py-1 px-2 bg-danger text-white">Sin Stock</span>
            ) : (
              <span className="badge py-1 px-2 bg-dark me-1">Envío Gratis</span>
            )}
          </div>
        ) : null}

        {product.cuotasLabel && (
          <div className="card-pinned-top-start">
            <span className="badge py-1 px-2 badge-yellow">{product.cuotasLabel}</span>
          </div>
        )}
      </div>

      <div className="card-body p-2 px-3">
        <button
          className="h6 text-body text-dark font-medium bg-transparent border-0 p-0 text-start"
          onClick={() => openProduct(product.id)}
        >
          {product.title}
        </button>

        <div className="pricing-meta mt-2">
          <ul className="list-unstyled d-md-flex align-items-center gap-1">
            <li className="current-price text-dark">
              ${formatPrice(product.price)}
            </li>
            {product.oldPrice && product.oldPrice > product.price && (
              <li className="old-price text-muted">
                ${formatPrice(product.oldPrice)}
              </li>
            )}
            {product.discount > 0 && (
              <li>
                <span className="badge py-1 px-2 badge-yellow">-{product.discount}%</span>
              </li>
            )}
          </ul>
        </div>

        {product.installmentsLabel && (
          <p className="small mb-1 font-12">
            Hasta <span className="font-bold">{product.installmentsLabel}</span> sin interés
          </p>
        )}
        {product.taxLabel && <p className="small mb-0 font-12">{product.taxLabel}</p>}
      </div>

      <div className="card-footer pt-2 px-3 pb-3">
        <button
          type="button"
          className={`btn btn-sm rounded-pill px-4 w-100 ${
            inCart ? "btn-secondary" : "btn-primary"
          }`}
          onClick={handleAddToCart}
          disabled={inCart}
        >
          {inCart ? "Agregado" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
