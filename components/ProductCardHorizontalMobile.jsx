// src/components/ProductCard.jsx
import { useState, useEffect } from "react";
import { useFavorites } from "../src/hooks/useFavorites";
import { useCart } from "../src/hooks/useCart";
import { useFloatingAlert } from "../src/context/FloatingAlertContext";

export default function ProductCardHorizontalMobile({ product, openProduct }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, addToCart } = useCart();
  const { showAlert } = useFloatingAlert();

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
    <div className="card card-bordered card-stretched-vertical shadow-none py-2">
        <div className="d-flex gap-2 px-2">
            <div style={{width:"40%"}}>
                <div>
                    
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
            </div>

            <div style={{width:"60%"}}>
                {/* Información principal */}
                <div>
                    <div className="mb-2">
                    {/* Badges */}
                    {product.envioGratis || !product.stock ? (
                    <div className="badge-envio-h">
                        {!product.stock ? (
                        <span className="badge py-1 px-2 bg-danger text-white">Sin Stock</span>
                        ) : (
                        <span className="badge py-1 px-2 bg-dark me-1">Envío Gratis</span>
                        )}
                    </div>
                    ) : null}
                    </div>

                    <div>
                    <button
                    className="small text-body text-dark font-medium bg-transparent border-0 p-0 text-start"
                    onClick={() => openProduct(product.slug)}
                    >
                    {product.title}
                    </button>
                    </div>


                    <div className="pricing-meta my-1">
                        <ul className="d-flex mb-1">
                            {product.oldPrice && product.oldPrice > product.price && (
                            <li className="old-price text-muted">
                                ${formatPrice(product.oldPrice)}
                            </li>
                            )}

                            {product.discount > 0 && (
                            <li>
                                <span className="badge py-1 px-2 badge-yellow">
                                -{product.discount}%
                                </span>
                            </li>
                            )}
                        </ul>
                        
                        <ul className="list-unstyled d-flex align-items-center gap-1">
                            <li className="current-price text-dark">
                                <span className="h3 font-bold">${formatPrice(product.price)}</span>
                            </li>
                        </ul>
                    </div>

                    {product.installmentsLabel && (
                    <p className="small mb-0 font-12">
                        Hasta <span className="font-bold">{product.installmentsLabel}</span> sin interés
                    </p>
                    )}

                    {product.taxLabel && (
                    <p className="small mb-0 font-12">{product.taxLabel}</p>
                    )}
                </div>
            </div>

        </div>

    </div>
  );
}
