import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import { Modal } from "bootstrap";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useFloatingAlert } from "@/context/FloatingAlertContext";
import AlertFloating from "@/components/alert/AlertFloating";
import DiscountMethod from "@/components/Modals/MethodsDiscountModal";

export default function ProductDetail({ product }) {
  const navigate = useNavigate();
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
    showAlert({
      product,
      action: newFavState ? "favorite-add" : "favorite-remove"
    });
  };

const handleAddToCart = () => {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    // Si ya existe, sumar cantidad
    addToCart({ ...product, quantity: existing.quantity + quantity });
  } else {
    addToCart({ ...product, quantity });
  }

showAlert({
  product,
  action: "cart"
});
};

const openDiscountModal = (e) => {
  e.preventDefault();

  const modalEl = document.getElementById("paymentsMethods");
  if (!modalEl) return;

  const modal = Modal.getOrCreateInstance(modalEl);
  modal.show();
};


const handleStartCheckout = () => {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    addToCart({ ...product, quantity: existing.quantity + quantity });
  } else {
    addToCart({ ...product, quantity });
  }

  setTimeout(() => {
    navigate("/cart");
  }, 0);
};
  return (
    <>
      {/* ALERTA FLOTANTE */}
      <AlertFloating/>

      {/* Código + rating */}
      <div className="d-flex align-items-center justify-content-between small mb-2">
        <p className="link-muted mb-0">
          <small className="font-medium">Código: {product.code || "N/A"}</small>
        </p>

        <div className="d-none d-md-flex align-items-center">
          <div>
            <button
              type="button"
              className="btn btn-link p-0 font-14"
              onClick={() => {
                const el = document.getElementById("SimilarsProfucts");
                if (el) {
                  el.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });
                }
              }}
            >
              Ver similares
            </button>
          </div>

          {/* <div className="text-warning ms-2 d-flex gap-1">
            {[...Array(5)].map((_, i) => (
              <small key={i} className="bi bi-star-fill"></small>
            ))}
          </div> */}
        </div>
      </div>


      {/* Título + Favorito */}
      <div className="d-flex justify-content-between align-items-start ">
        <h1 className="h2 font-bold mb-0">{product.title}</h1>

        <button
          type="button"
          className={`btn-fav btn btn-xs p-3 btn-icon rounded-circle font-18 d-none d-md-flex ${
            isFavorite ? "text-danger" : "text-muted"
          }`}
          onClick={handleToggleFavorite}
        >
          <i className={isFavorite ? "bi-heart-fill" : "bi-heart"}></i>
        </button>
      </div>


      {/* Subtítulo / descripción corta */}
      <div className="mb-3">
        <p className="mb-0">{product.shortDescription}</p>
      </div>


      {/* Stock */}
      <div className="d-flex justify-content-between pb-2 px-1 px-md-0">
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
      <div className="d-md-block mb-3">
        <div>
          <div className="d-flex align-items-center pb-2">
            {product.oldPrice && (
              <span className="h4 text-secondary mb-0">
                <del>${formatAR(product.oldPrice)}</del>
              </span>
            )}
            {product.discount > 0 && (
              <div className="ms-2">
                <span className="badge badge-yellow font-13">
                  - {product.discount}% OFF
                </span>
              </div>
            )}
          </div>

          <div>
            <span className="h2 font-bold">
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
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-credit-card flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="mb-0 small lh-sm">
                <span className="d-flex text-black">
                  <span className="font-bold">{product.installmentsLabel}</span>
                  <a href="#" className="ps-1" onClick={openDiscountModal}>
                    Ver tarjetas
                  </a>
                </span>
              </p>
            </div>
          </li>

          <li>
            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-cash-stack flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="mb-0 small lh-sm">
                <span className="d-block text-black">
                 <span className="font-bold">10% de descuento</span> pagando con transferencia o depósito. <a href="#" onClick={openDiscountModal}> Ver más detalles</a>
                </span>
              </p>
            </div>
          </li>

          <li>
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-truck flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="mb-0 small lh-sm">
                <span className="d-block text-black">
                   <span className="font-bold">Envíos grátis</span> a partir de $99.000
                </span>
              </p>
            </div>
          </li>

          <li>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-shop flex-shrink-0 me-1 lh-1 f-icons-18"></i>
              <p className="mb-0 small lh-sm">
                <span className="d-block text-black">
                   <span className="font-bold">Retiro Gratis</span> en sucursal ¡Retiralo YA!
                </span>
              </p>
            </div>
          </li>


        </ul>
      </div>


      {/* Cantidad + carrito */}
      <div className="d-none d-md-flex gap-3 py-4 mb-0 px-1 px-md-0">

        {/* Quantity */}
        <div className="border rounded btn-i-d btn-w-50  mb-0">
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
          className="btn btn-sm btn-block btn-primary"
          onClick={handleAddToCart}
        >
          Agregar  al carrito
        </button>
      </div>



      {/* MOBILE > Cantidad + carrito */}
      <div className="d-flex d-md-none gap-1 box_fixed-detail-mobile">
        <div className="d-flex align-items-cente gap-2 pb-1">
            <div className="d-flex align-items-center">
              <span className="h2 font-bold mb-0">
                ${formatAR(product.price)}
              </span>
            </div>

          {product.oldPrice && (
            <div className="d-flex align-items-center">
              <span className="h4 text-secondary mb-0">
                <del>${formatAR(product.oldPrice)}</del>
              </span>
            </div>
          )}
          {product.discount > 0 && (
            <div className="d-flex align-items-center">
              <span className="badge badge-yellow font-15">
                - {product.discount}% OFF
              </span>
            </div>
          )}

        </div>

        <div className="mb-3">
          <span className="d-flex text-black">
            <span className="font-15 font-medium">{product.cuotasLabel}</span>
            <span className="font-15 font-medium ps-1">de ${product.cuotaPrice}</span>
          </span>
        </div>

        <div className="d-flex gap-3">
          {/* Add to cart */}
          <button
            type="button"
            className="btn btn-sm btn-block btn-secondary"
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart3"></i> Agregar 
          </button>

          {/* Add to cart */}
          <button
            type="button"
            className="btn btn-sm btn-block btn-primary"
            onClick={handleStartCheckout}
          >
            Comprar
          </button>
        </div>
      </div>



      {/* Compra protegida */}
      <div className="d-flex align-items-start pt-3 pb-2 px-1 px-md-0">
        <i className="bi bi-shield-check flex-shrink-0 me-1 lh-1 text-black f-icons-18"></i>
        <p className="mb-0 small lh-sm">
          <b className="d-block text-black">Compra protegida</b>
          <span className="text-black">
            Tus datos cuidados durante toda la compra.
          </span>
        </p>
      </div>


      {/* Cambios y devoluciones */}
      <div className="d-flex align-items-start pt-3 pb-2 px-1 px-md-0">
        <i className="bi bi-arrow-clockwise flex-shrink-0 me-1 lh-1 text-black f-icons-18"></i>
        <p className="mb-0 small lh-sm">
          <b className="d-block text-black">Cambios y devoluciones</b>
          <span className="text-black">
            Si no te gusta, podés cambiarlo por otro o devolverlo.
          </span>
        </p>
      </div>


      {/*Modal Payments Methods */}
      <DiscountMethod />


    </>
  );
}
