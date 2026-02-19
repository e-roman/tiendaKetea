import { useState } from "react";
import { Offcanvas } from "bootstrap";
import { useCart } from "@/hooks/useCart";
import { useNavigate, Link } from "react-router-dom";

import QuantityControl from "./QuantityControl";

export default function SidebarCart() {
  const [pickup, setPickup] = useState(false);

const {
  cart,
  removeFromCart,
  updateQuantity,
  shipping,
  setShipping,
  shippingCost,
  subtotal,
  total,
} = useCart();

  const navigate = useNavigate();

  const closeCart = () => {
    const el = document.getElementById("cartOffcanvas");
    if (!el) return;
    const bs = Offcanvas.getInstance(el);
    if (bs) bs.hide();
  };

  const handleStartCheckout = () => {
    closeCart();
    navigate("/cart");
  };

  // Funciones para manejar cantidad en el sidebar
  const decrease = (product) => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  const increase = (product) => {
    updateQuantity(product.id, product.quantity + 1);
  };

  return (
    <div className="offcanvas offcanvas-end" id="cartOffcanvas" tabIndex="-1">
      {/* HEADER */}
      <div className="offcanvas-header justify-content-between align-items-center border-bottom py-3 px-3">
        <h4 className="font-bold mb-0">Carrito de Compras</h4>
        <button className="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>

      {/* BODY */}
      <div className="offcanvas-body py-3 px-4">
        {cart.length === 0 ? (
          <div id="emptyCart" className="content-space-t-5 text-center">
            <div className="w-lg-100 mx-md-auto px-5">
              <div className="mb-5">
                <img className="avatar avatar-xxl avatar-4x2" src="../assets/svg/illustrations/empty-cart.svg" alt="SVG"/>
              </div>
              <h1 className="h2 mb-2">Tu carrito está vacío.</h1>
              <p>Antes de finalizar la compra, debes añadir algunos productos a tu carrito.</p>
              <button className="btn btn-primary btn-sm px-6" data-bs-dismiss="offcanvas">Agregar Productos</button>
            </div>
          </div>
        ) : (
          <div id="listCart" className="list-group">
            <ul className="items-SideCart">
              {cart.map((product) => (
                <li key={product.slug} className="itemAdded gap-3 d-flex mb-3">
                  <div className="flex-shrink-0 d-flex align-items-start justify-content-center position-relative">
                    {product.quantity > 1 && (
                      <span className="badge badge-sm bg-primary badge-pos rounded-circle">
                        {product.quantity}
                      </span>
                    )}
                    <img src={product.image} className="avatar avatar-xl" alt={product.title} />
                  </div>

                  <div className="d-flex flex-column ms-3 w-100">
                    <div className="d-flex justify-content-between align-items-start">

                      <div>
                        <Link
                          to={`/product/${product.slug}`}
                          className="text-dark text-decoration-none"
                          onClick={closeCart}
                        >
                          <h5 className="mb-0 pe-4">{product.title}</h5>
                        </Link>

                        <div className="mb-2 w-100">
                        {/* Badges */}
                        {product.stock ? (
                          <>
                            {product.discount > 0 && (
                              <span className="badge py-1 px-2 badge-yellow me-1">-{product.discount}% OFF</span>
                            )}
                            {product.envioGratis && (
                              <span className="badge py-1 px-2 badge-green text-white me-1">Envío Gratis</span>
                            )}
                          </>
                        ) : (
                          <span className="badge py-1 px-2 badge-danger text-white">Sin Stock</span>
                        )}
                        </div>
                      </div>

                      <button
                        className="text-secondary font-18 btn border-0 pt-0 bg-transparent pe-0"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>

                    {/* Quantity + Precios */}
                    <div className="d-flex align-items-center justify-content-between gap-3 mt-2">
                      <div className="w-md-35">
                        {/* Quantity */}
                        <QuantityControl
                          item={product}
                          onIncrease={increase}
                          onDecrease={decrease}
                        />
                      </div>


                      {/* Precios */}
                      <div className="pricing-meta my-0">
                        <ul>
                          {product.oldPrice && (
                            <li className="old-price">
                              ${(product.oldPrice).toLocaleString()}
                            </li>
                          )}
                          <li className="current-price font-medium">
                            ${(product.price * product.quantity).toLocaleString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* SUBTOTAL */}
            <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
              <h4 className="mb-0 font-bold">Subtotal <span className="h6">(Sin envío)</span>:</h4>
              <h4 className="mb-0 font-bold">
                 ${subtotal.toLocaleString("es-AR")}
              </h4>
            </div>

            <div className="d-flex align-items-center justify-content-between py-3 text-black border-bottom">
              <span className="small">Entregas para el CP: 1706</span>

              <div>
                <button type="button" className="btn btn-sm btn-outline-dark py-0 px-2 small">Cambiar CP</button>
              </div>
              {/* <span className="font-medium">
                {shippingCost === 0 ? "Gratis" : `$${shippingCost.toLocaleString("es-AR")}`}
              </span> */}
            </div>


              <div className="alert alert-warning small py-2 text-center rounded-2">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Los productos Automower se retiran por el local.
              </div>



            <div className="pb-2">

              <p className="small text-black mb-2">
                <i className="bi bi-truck f-icons-18"></i> Envío a Domicilio
              </p>

              {/* ENVÍO STANDARD */}
              <label
                className={`delivery-card ${!pickup && shipping === "standard" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={!pickup && shipping === "standard"}
                  onChange={() => {
                    setPickup(false);
                    setShipping("standard");
                  }}
                />

                <div className="delivery-indicator">
                  <i className="bi bi-check-lg"></i>
                </div>

                <div className="delivery-content">
                  <span className="delivery-title">Envío Personalizado</span>
                  <span className="delivery-desc">
                    Llega entre el Martes 23/12 y el Viernes 26/12
                  </span>
                </div>
              </label>

              {/* ENVÍO EXPRESS */}
              <label
                className={`delivery-card ${!pickup && shipping === "express" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={!pickup && shipping === "express"}
                  onChange={() => {
                    setPickup(false);
                    setShipping("express");
                  }}
                />

                <div className="delivery-indicator">
                  <i className="bi bi-check-lg"></i>
                </div>

                <div className="delivery-content">
                  <span className="delivery-title">Envío Express</span>
                  <span className="delivery-desc">
                    Tiene un costo de $25.500 y llega hoy
                  </span>
                </div>
              </label>

              <p className="small text-black mt-4 mb-2">
                <i className="bi bi-geo-alt"></i> Retirar en local
              </p>

              {/* PICKUP */}
              <label
                className={`delivery-card ${pickup ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={pickup}
                  onChange={() => {
                    setPickup(true);
                    setShipping("standard");
                  }}
                />

                <div className="delivery-indicator">
                  <i className="bi bi-check-lg"></i>
                </div>

                <div className="delivery-content">
                  <span className="delivery-title">Ketea Ramos Mejía</span>
                  <span className="delivery-desc">
                    Cnel. Brandsen 2230, Ramos Mejía<br />
                    Lunes a Viernes de 9 a 18hs.
                  </span>
                </div>
              </label>

            </div>




          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="footer-sidebar">

            {/* TOTAL */}
            <div className="pb-3 pb-md-4 d-flex align-items-center justify-content-between">
              <h3 className="mb-0">Total:</h3>
              <h2 className="mb-0 font-bold">
                  ${total.toLocaleString("es-AR")}
              </h2>
            </div>

          <div className="w-100">
            <button className="btn btn-primary font-18 px-6 w-100" onClick={handleStartCheckout}>
              Iniciar compra
            </button>
          </div>


          {/* <div className="d-none d-md-block">
            <Link className="btn bg-white btn-sm px-6 w-100" data-bs-dismiss="offcanvas">
              Ver más Productos
            </Link>
          </div> */}
        </div>
      )}
    </div>
  );
}
