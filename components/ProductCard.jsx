// src/components/ProductCard.jsx
import { useState, useEffect } from "react";
import { useFavorites } from "../src/hooks/useFavorites";
import { useCart } from "../src/hooks/useCart";
import { useFloatingAlert } from "../src/context/FloatingAlertContext";

export default function ProductCard({ product, openProduct }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, addToCart } = useCart();
  const { showAlert } = useFloatingAlert();

  const [inCart, setInCart] = useState(false);
  const isFav = favorites.some((f) => f.id === product.id);

  const hasStock = product.stock > 0;
  const isDisabled = inCart || !hasStock;


  useEffect(() => {
    setInCart(cart.some((item) => item.id === product.id));
  }, [cart, product.id]);

  const formatPrice = (value) => (value ? value.toLocaleString("es-AR") : "0");

  const handleAddToCart = () => {
    if (!hasStock || inCart) return;

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
        
        {/* Imagen del producto */}
        <button
          className="p-0 border-0 bg-transparent"
          onClick={() => openProduct(product.slug)}
        >
          <img className="card-img-top" src={product.image} alt={product.title} />
        </button>

        {/* Favorito */}
        <div className="card-pinned-top-end">
          <button
            type="button"
            className="btn-fav btn btn-xs p-3 btn-icon rounded-circle"
            onClick={handleToggleFavorite}
          >
            <i className={isFav ? "bi-heart-fill font-16" : "bi-heart font-16"}></i>
          </button>
        </div>

        {product.cuotasLabelBadge && (
          <div className="card-pinned-top-start">
             <span className="badge py-1 px-2 badge-yellow">{product.cuotasLabelBadge}</span>
          </div>
        )}
      </div>

      {/* Información principal */}
      <div className="card-body pt-0 pb-3 px-3">
        <button
          className="text-body text-dark font-medium font-16 bg-transparent border-0 p-0 text-start pb-1 "
          onClick={() => openProduct(product.slug)}
        >
          {product.title}
        </button>

        <div className="pricing-meta my-1 pb-1">

            {product.oldPrice && product.oldPrice > product.price && (
              <div className="d-flex align-items-center gap-1 pb-1">
                <span className="font-13">Antes</span>
                <div className="old-price text-muted">
                  {formatPrice(product.oldPrice)}
                </div>
              </div>
            )}


          <ul className="list-unstyled d-flex align-items-center gap-1">
            <li className="current-price text-dark">
               {formatPrice(product.price)}
            </li>


            {product.discount > 0 && (
              <li>
                <span className="badge font-12 py-1 px-2 badge-yellow">
                  -{product.discount}% OFF
                </span>
              </li>
            )}
          </ul>
        </div>

        {product.installmentsLabel && (
          <p className="small mb-0 font-13 font-medium">
            Hasta <span className="font-bold">{product.installmentsLabel}</span> sin interés
          </p>
        )}


        {/* Badges */}
        {product.envioGratis || !product.stock ? (
          <div className="pt-1">
            {!product.stock ? (
              <span className="badge py-1 px-2 bg-danger text-white">Sin Stock</span>
            ) : (
              <span className="badge py-1 px-2 bg-dark me-1">Envío Grátis</span>
            )}
          </div>
        ) : null}


        <div className="pt-2">
           <p className="text-pay small">Pagá fácil y rápido con Mercado Pago o MODO</p>
        </div>

        {/* {product.taxLabel && (
          <p className="small mb-0 font-12">{product.taxLabel}</p>
        )} */}
      </div>

      {/* Botón agregar al carrito */}
      {/* <div className="card-footer pt-2 px-3 pb-3">
        <button
          type="button"
          className={`btn btn-sm px-4 w-100 ${
            !hasStock
              ? "btn-secondary"
              : inCart
              ? "btn-secondary"
              : "btn-primary"
          }`}
          onClick={handleAddToCart}
          disabled={isDisabled}
        >
          {!hasStock
            ? "Agregar al carrito"
            : inCart
            ? "Agregado al carrito"
            : "Agregar al carrito"}
        </button>
      </div> */}

    </div>
  );
}
