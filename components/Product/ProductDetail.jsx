import { useState, useEffect } from "react";
import { useCart } from "../../src/hooks/useCart";
import { useFavorites } from "../../src/hooks/useFavorites";
import { useFloatingAlert } from "../../src/context/FloatingAlertContext";
import AlertFloating from "../AlertFloating";


export default function ProductDetail({ product }) {
  const { cart, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(cart.some(item => item.id === product.id));
  }, [cart, product.id]);

  const [quantity, setQuantity] = useState(1);

  // Verificar si ya está en favoritos
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fav = favorites.some((f) => f.slug === product.slug);
    setIsFavorite(fav);
  }, [favorites, product.slug]);

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
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    // Si ya existe, sumar cantidad
    addToCart({ ...product, quantity: existing.quantity + quantity });
  } else {
    addToCart({ ...product, quantity });
  }

  showAlert("Agregaste el producto al carrito", "success");
};
  return (
    <>
      {/* ALERTA FLOTANTE */}
      <AlertFloating/>

      {/* Código + rating */}
      <div className="d-none d-md-flex align-items-center justify-content-between small mb-2">
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
      <div className="d-none d-md-flex justify-content-between align-items-start ">
        <h1 className="h2 font-bold mb-0">{product.title}</h1>

        <button
          type="button"
          className={`btn-fav btn btn-xs p-3 btn-icon rounded-circle font-18 ${
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
      <div className="d-flex justify-content-between pb-3 px-1 px-md-0">
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
      <div className="d-none d-md-block mb-3">
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
              <span className="badge badge-yellow py-1 px-2 text-dark rounded-1 font-15">
                - {product.discount}% OFF
              </span>
            </div>
          )}
        </div>
      </div>




      {/* Precios */}
      <div className="d-block d-md-none mb-1 px-1 px-md-0">
        <div>
         
          <div className="d-flex align-items-center">
            {product.oldPrice && (
              <span className="h4 text-secondary mb-0 me-1">
                <del>${formatAR(product.oldPrice)}</del>
              </span>
            )}

            {product.discount && (
              <div className="ms-2">
                <span className="badge badge-yellow py-1 px-2 text-dark rounded-1 font-15">
                  - {product.discount}% OFF
                </span>
              </div>
            )}
          </div>

          <div className="pt-1 pb-3">
            <span className="h2 font-bold price-xs">
              ${formatAR(product.price)}
            </span>
          </div>

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
      <div className="px-1 px-md-0">
        <ul className="pb-0 text-black">

          <li>
            <div className="d-flex align-items-start">
              <i className="bi bi-credit-card flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="pb-3 mb-0 small lh-sm">
                <span className="d-flex text-black">
                  <div className="font-bold">{product.installmentsLabel}</div>. <a href="#">Ver tarjetas</a>
                </span>
              </p>
            </div>
          </li>

          <li>
            <div className="d-flex align-items-start">
              <i className="bi bi-cash-stack flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="pb-3 mb-0 small lh-sm">
                <span className="d-block text-black">
                 <span className="font-bold">10% de descuento</span> pagando con transferencia o depósito. <a href="#"> Ver más detalles</a>
                </span>
              </p>
            </div>
          </li>

          <li>
            <div className="d-flex align-items-start">
              <i className="bi bi-truck flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="pb-3 mb-0 small lh-sm">
                <span className="d-block text-black">
                   <span className="font-bold">Envíos gratis</span> a partir de $99.000
                </span>
              </p>
            </div>
          </li>

        </ul>
      </div>


      {/* Cantidad + carrito */}
      <div className="d-flex gap-3 py-4 mb-0 px-1 px-md-0">

        {/* Quantity */}
        <div className="border rounded btn-i-d mb-4 mb-md-0">
          <div className="d-flex align-items-center justify-content-between">
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
          className="btn btn-block rounded-pill btn-primary"
          onClick={handleAddToCart}
        >
          Agregar {quantity} al carrito
        </button>
      </div>


      {/* Compra protegida */}
      <div className="d-flex align-items-start pt-3 px-1 px-md-0">
        <i className="bi bi-shield-check flex-shrink-0 me-1 lh-1 text-black f-icons-18"></i>
        <p className="pb-3 mb-0 small lh-sm">
          <b className="d-block text-black">Compra protegida</b>
          <span className="text-black">
            Tus datos cuidados durante toda la compra.
          </span>
        </p>
      </div>


      {/* Cambios y devoluciones */}
      <div className="d-flex align-items-start pt-3 px-1 px-md-0">
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
