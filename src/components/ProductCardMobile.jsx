// src/components/ProductCard.jsx
import { useState, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useFloatingAlert } from "@/context/FloatingAlertContext";

export default function ProductCardMobile({ product, openProduct }) {
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

        {/* {product.cuotasLabelBadge && (
          <div className="card-pinned-top-start">
            <span className="badge py-1 px-2 bg-primary">{product.cuotasLabelBadge}</span>
          </div>
        )} */}
      </div>

      {/* Información principal */}
      <div className="card-body px-card-xs py-2 px-3">
        <button
          className="text-body text-dark font-16 bg-transparent border-0 p-0 text-start mb-0 "
          onClick={() => openProduct(product.slug)}
        >
          {product.title}
        </button>

        <div className="pricing-meta mt-1 mb-1">
          <div className="d-flex gap-1 pt-1">
            {product.oldPrice && product.oldPrice > product.price && (
              <li className="old-price text-muted">
                ${formatPrice(product.oldPrice)}
              </li>
            )}
          </div>

          <ul className="list-unstyled d-flex align-items-center gap-1">
            <li className="current-price text-dark">
              ${formatPrice(product.price)}
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
          <p className="small mb-0 font-13 font-bold">
             <span>{product.installmentsLabel}</span> sin interés
          </p>
        )}

        {/* Badges */}
        {product.envioGratis || product.retiroInmediato || !product.stock ? (
          <div className="pt-1">
            {!product.stock ? (
              <span className="badge py-1 px-2 badge-red text-white">
                Sin Stock
              </span>
            ) : (
              <>
                {product.envioGratis && (
                  <span className="badge badge-green py-1 px-2 bg-dark me-1">
                    Envío Grátis
                  </span>
                )}

                {product.retiroInmediato && (
                  <span className="badge badge-green py-1 px-2 bg-dark me-1">
                    Retiralo Hoy
                  </span>
                )}
              </>
            )}
          </div>
        ) : null}


        <div className="pt-2 pb-0">
           <p className="text-pay">Pagá fácil y rápido con Mercado Pago o MODO</p>
        </div>


        {/* {product.taxLabel && (
          <p className="small mb-0 font-12">{product.taxLabel}</p>
        )} */}
      </div>

      {/* Botón agregar al carrito */}
      {/* <div className="card-footer pt-2 px-3 pb-3">
        <button
          type="button"
          className={`btn btn-sm rounded-pill px-4 w-100 ${
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
