import { useState, useEffect } from "react";
import { useCart } from "../../src/hooks/useCart";
import { useFavorites } from "../../src/hooks/useFavorites";
import { useFloatingAlert } from "../../src/context/FloatingAlertContext";
import AlertFloating from "../AlertFloating";


export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);

  // Verificar si ya está en favoritos
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fav = favorites.some((f) => f.id === product.id);
    setIsFavorite(fav);
  }, [favorites, product.id]);

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const formatAR = (number) =>
    number.toLocaleString("es-AR", { minimumFractionDigits: 0 });

  const { showAlert } = useFloatingAlert(); // solo la función

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    const newFavState = !isFavorite;
    setIsFavorite(newFavState);
    showAlert(newFavState ? "Agregaste a favoritos" : "Eliminaste un favorito", "success");
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    showAlert("Agregaste el producto al carrito", "success");
  };
  return (
    <>
      {/* ALERTA FLOTANTE */}
      <AlertFloating/>

      {/* Código + rating */}
      <div className="d-flex align-items-center justify-content-between small mb-2">
        <p className="link-muted mb-0">
          <small>Código: {product.code || "N/A"}</small>
        </p>

        <div className="d-flex align-items-center">
          <div>
            <a href="#reviewSection" className="small">
              Ver comentarios
            </a>
          </div>

          <div className="text-warning ms-2 d-flex gap-1">
            {[...Array(5)].map((_, i) => (
              <small key={i} className="bi bi-star-fill"></small>
            ))}
          </div>
        </div>
      </div>


      {/* Título + Favorito */}
      <div className="d-flex justify-content-between align-items-start">
        <h1 className="h2 font-bold mb-0">{product.title}</h1>

        <button
          type="button"
          className={`btn font-20 btn-sm p-0 btn-fav ${
            isFavorite ? "text-danger" : "text-muted"
          }`}
          onClick={handleToggleFavorite}
        >
          <i className={isFavorite ? "bi-heart-fill" : "bi-heart"}></i>
        </button>
      </div>


      {/* Subtítulo / descripción corta */}
      <div className="mb-2">
        <p className="mb-0">{product.shortDescription}</p>
      </div>


      {/* Stock */}
      <div className="d-flex justify-content-between pb-3">
        {product.stock <= 1 ? (
          <span className="badge py-1 px-2 bg-danger text-white rounded-1">
            ¡Último en stock!
          </span>
        ) : (
          <span className="badge py-1 px-2 bg-success text-white rounded-1">
            Stock disponible
          </span>
        )}
      </div>


      {/* Precios */}
      <div className="mb-1">
        <div className="d-flex align-items-center">
          <div>
            {product.oldPrice && (
              <span className="h4 text-secondary me-1">
                <del>${formatAR(product.oldPrice)}</del>
              </span>
            )}

            <span className="h2 font-bold">
              ${formatAR(product.price)}
            </span>
          </div>

          {product.discount && (
            <div className="ms-2">
              <span className="badge py-1 px-2 bg-warning text-white rounded-1 font-15">
                - {product.discount}%
              </span>
            </div>
          )}
        </div>
      </div>


      {/* Precio sin impuestos */}
      {product.priceWithoutTaxes && (
        <div className="pb-1">
          <p className="font-normal mb-3">
            <small>
              Precio sin Impuestos Nacionales{" "}
              <span className="font-bold text-black">
                ${formatAR(product.priceWithoutTaxes)}
              </span>
            </small>
          </p>
        </div>
      )}


      {/* Beneficios */}
      <div>
        <ul className="pb-0 text-black">

          <li>
            <div className="d-flex align-items-start">
              <i className="bi bi-credit-card flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="pb-3 mb-0 small lh-sm">
                <span className="d-block text-black">
                  <b>{product.installmentsLabel}</b>.{" "}
                  <a href="#">Ver tarjetas</a>
                </span>
              </p>
            </div>
          </li>

          <li>
            <div className="d-flex align-items-start">
              <i className="bi bi-cash-stack flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="pb-3 mb-0 small lh-sm">
                <span className="d-block text-black">
                  <b>10% de descuento</b> pagando con Transferencia o depósito.
                  <a href="#"> Ver más detalles</a>
                </span>
              </p>
            </div>
          </li>

          <li>
            <div className="d-flex align-items-start">
              <i className="bi bi-truck flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="pb-3 mb-0 small lh-sm">
                <span className="d-block text-black">
                  <b>Envíos gratis</b> a partir de $99.000
                </span>
              </p>
            </div>
          </li>

        </ul>
      </div>


      {/* Cantidad + carrito */}
      <div className="d-flex gap-3 py-4 mb-0">

        {/* Quantity */}
        <div className="border rounded btn-i-d">
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-icon btn-xs px-1 rounded-circle"
              onClick={decrease}
            >
              <h4 className="btn-icon__inner font-normal mb-0">-</h4>
            </button>

            <input
              className="form-control lh-1 border-0 rounded p-0 text-center w-25"
              type="text"
              value={quantity}
              readOnly
            />

            <button
              type="button"
              className="btn btn-icon btn-xs px-1 rounded-circle"
              onClick={increase}
            >
              <h4 className="btn-icon__inner font-normal mb-0">+</h4>
            </button>
          </div>
        </div>

        {/* Add to cart */}
        <button
          type="button"
          className="btn btn-block btn-primary rounded-pill btn-shop"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>


      {/* Compra protegida */}
      <div className="d-flex align-items-start pt-3">
        <i className="bi bi-shield-check flex-shrink-0 me-1 lh-1 text-black f-icons-18"></i>
        <p className="pb-3 mb-0 small lh-sm">
          <b className="d-block text-black">Compra protegida</b>
          <span className="text-black">
            Tus datos cuidados durante toda la compra.
          </span>
        </p>
      </div>


      {/* Cambios y devoluciones */}
      <div className="d-flex align-items-start pt-3">
        <i className="bi bi-arrow-clockwise flex-shrink-0 me-1 lh-1 text-black f-icons-18"></i>
        <p className="pb-3 mb-0 small lh-sm">
          <b className="d-block text-black">Cambios y devoluciones</b>
          <span className="text-black">
            Si no te gusta, podés cambiarlo por otro o devolverlo.
          </span>
        </p>
      </div>

    </>
  );
}
