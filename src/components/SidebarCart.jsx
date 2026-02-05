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
<div
  className="offcanvas offcanvas-end show"
  id="cartOffcanvas"
  tabIndex={-1}
  aria-modal="true"
  role="dialog"
>
  <div className="offcanvas-header justify-content-between align-items-center border-bottom py-3 px-3">
    <h4 className="font-bold mb-0">Carrito de Compras</h4>
    <button className="btn-close" data-bs-dismiss="offcanvas" />
  </div>

  <div className="offcanvas-body py-3 px-4">
    <div id="listCart" className="list-group">
      <ul className="items-SideCart">

        {/* ITEM 1 */}
        <li className="itemAdded gap-3 d-flex mb-3">
          <div className="flex-shrink-0 d-flex align-items-start justify-content-center position-relative">
            <span className="badge badge-sm bg-primary badge-pos rounded-circle">
              3
            </span>
            <img
              className="avatar avatar-xl"
              alt="Robot limpia piscina Dolphin Pool Up"
              src="../assets/img/products/dolphin-Pool-up.png"
            />
          </div>

          <div className="d-flex flex-column ms-3 w-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <a
                  className="text-dark text-decoration-none"
                  href="/product/robot-limpia-piscinas-dolphin-pool-up"
                >
                  <h5 className="mb-0 pe-4">
                    Robot limpia piscina Dolphin Pool Up
                  </h5>
                </a>

                <div className="mb-2 w-100">
                  <span className="badge py-1 px-2 badge-blue me-1">
                    -25%
                  </span>
                  <span className="badge py-1 px-2 bg-send text-white me-1">
                    Envío Gratis
                  </span>
                </div>
              </div>

              <button className="text-secondary font-18 btn border-0 pt-0 bg-transparent pe-0">
                <i className="bi bi-trash" />
              </button>
            </div>

            <div className="d-flex align-items-center justify-content-between gap-3 mt-2">
              <div className="w-md-35">
                <div className="border rounded btn-i-d d-flex align-items-center justify-content-between w-100">
                  <button type="button" className="btn btn-icon btn-xs px-1 rounded-circle">
                    <h4 className="btn-icon__inner font-normal mb-0">-</h4>
                  </button>

                  <div className="w-25 d-flex justify-content-center">
                    <input
                      className="form-control lh-1 border-0 rounded p-0 text-center"
                      type="text"
                      value="3"
                      readOnly
                    />
                  </div>

                  <button type="button" className="btn btn-icon btn-xs px-1 rounded-circle">
                    <h4 className="btn-icon__inner font-normal mb-0">+</h4>
                  </button>
                </div>
              </div>

              <div className="pricing-meta my-0">
                <ul>
                  <li className="old-price">$2.308.950</li>
                  <li className="current-price font-medium">$6.234.165</li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        {/* ITEM 2 */}
        <li className="itemAdded gap-3 d-flex mb-3">
          <div className="flex-shrink-0 d-flex align-items-start justify-content-center position-relative">
            <img
              className="avatar avatar-xl"
              alt="Pastillas Cloro Multiacción Nataclor 1kg"
              src="../assets/img/products/Pastillas-Cloro-Multiacción-Nataclor-1kg.png"
            />
          </div>

          <div className="d-flex flex-column ms-3 w-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <a
                  className="text-dark text-decoration-none"
                  href="/product/cloro-pastillas-nataclor-multiaccion-1kg"
                >
                  <h5 className="mb-0 pe-4">
                    Pastillas Cloro Multiacción Nataclor 1kg
                  </h5>
                </a>

                <div className="mb-2 w-100">
                  <span className="badge py-1 px-2 badge-blue me-1">
                    -7%
                  </span>
                </div>
              </div>

              <button className="text-secondary font-18 btn border-0 pt-0 bg-transparent pe-0">
                <i className="bi bi-trash" />
              </button>
            </div>

            <div className="d-flex align-items-center justify-content-between gap-3 mt-2">
              <div className="w-md-35">
                <div className="border rounded btn-i-d d-flex align-items-center justify-content-between w-100">
                  <button
                    type="button"
                    className="btn btn-icon btn-xs px-1 rounded-circle"
                    disabled
                  >
                    <h4 className="btn-icon__inner font-normal mb-0">-</h4>
                  </button>

                  <div className="w-25 d-flex justify-content-center">
                    <input
                      className="form-control lh-1 border-0 rounded p-0 text-center"
                      type="text"
                      value="1"
                      readOnly
                    />
                  </div>

                  <button type="button" className="btn btn-icon btn-xs px-1 rounded-circle">
                    <h4 className="btn-icon__inner font-normal mb-0">+</h4>
                  </button>
                </div>
              </div>

              <div className="pricing-meta my-0">
                <ul>
                  <li className="old-price">$159.900</li>
                  <li className="current-price font-medium">$148.900</li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        {/* ITEM 3 */}
        <li className="itemAdded gap-3 d-flex mb-3">
          <div className="flex-shrink-0 d-flex align-items-start justify-content-center position-relative">
            <img
              className="avatar avatar-xl"
              alt="Válvula Multipuerto Hayward SP0714T"
              src="../assets/img/products/valvula-multipuerto-hayward.png"
            />
          </div>

          <div className="d-flex flex-column ms-3 w-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <a
                  className="text-dark text-decoration-none"
                  href="/product/valvula-multipuerto-hayward-sp0714t"
                >
                  <h5 className="mb-0 pe-4">
                    Válvula Multipuerto Hayward SP0714T
                  </h5>
                </a>

                <div className="mb-2 w-100">
                  <span className="badge py-1 px-2 badge-blue me-1">
                    -11%
                  </span>
                </div>
              </div>

              <button className="text-secondary font-18 btn border-0 pt-0 bg-transparent pe-0">
                <i className="bi bi-trash" />
              </button>
            </div>

            <div className="d-flex align-items-center justify-content-between gap-3 mt-2">
              <div className="w-md-35">
                <div className="border rounded btn-i-d d-flex align-items-center justify-content-between w-100">
                  <button
                    type="button"
                    className="btn btn-icon btn-xs px-1 rounded-circle"
                    disabled
                  >
                    <h4 className="btn-icon__inner font-normal mb-0">-</h4>
                  </button>

                  <div className="w-25 d-flex justify-content-center">
                    <input
                      className="form-control lh-1 border-0 rounded p-0 text-center"
                      type="text"
                      value="1"
                      readOnly
                    />
                  </div>

                  <button type="button" className="btn btn-icon btn-xs px-1 rounded-circle">
                    <h4 className="btn-icon__inner font-normal mb-0">+</h4>
                  </button>
                </div>
              </div>

              <div className="pricing-meta my-0">
                <ul>
                  <li className="old-price">$248.000</li>
                  <li className="current-price font-medium">$221.588</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
        <h4 className="mb-0 font-bold">
          Subtotal <span className="h6">(Sin envío)</span>:
        </h4>
        <h4 className="mb-0 font-bold">$6.604.653</h4>
      </div>

      <div className="d-flex align-items-center justify-content-between py-3 text-black border-bottom">
        <span className="small">Entregas para el CP: 1706</span>
        <button type="button" className="btn btn-sm btn-outline-dark py-0 px-2 small">
          Cambiar CP
        </button>
      </div>

      <div className="alert alert-warning small py-2 text-center rounded-2">
        <i className="bi bi-exclamation-triangle me-2" />
        Los productos Automower se retiran por el local.
      </div>

      <div className="pb-2">
        <p className="small text-black mb-2">
          <i className="bi bi-truck f-icons-18" /> Envío a Domicilio
        </p>

        <label className="delivery-card">
          <input type="radio" name="delivery" />
          <div className="delivery-indicator">
            <i className="bi bi-check-lg" />
          </div>
          <div className="delivery-content">
            <span className="delivery-title">Envío Personalizado</span>
            <span className="delivery-desc">
              Llega entre el Martes 23/12 y el Viernes 26/12
            </span>
          </div>
        </label>

        <label className="delivery-card active">
          <input type="radio" name="delivery" defaultChecked />
          <div className="delivery-indicator">
            <i className="bi bi-check-lg" />
          </div>
          <div className="delivery-content">
            <span className="delivery-title">Envío Express</span>
            <span className="delivery-desc">
              Tiene un costo de $25.500 y llega hoy
            </span>
          </div>
        </label>

        <p className="small text-black mt-4 mb-2">
          <i className="bi bi-geo-alt" /> Retirar en local
        </p>

        <label className="delivery-card">
          <input type="radio" name="delivery" />
          <div className="delivery-indicator">
            <i className="bi bi-check-lg" />
          </div>
          <div className="delivery-content">
            <span className="delivery-title">Ketea Ramos Mejía</span>
            <span className="delivery-desc">
              Cnel. Brandsen 2230, Ramos Mejía
              <br />
              Lunes a Viernes de 9 a 18hs.
            </span>
          </div>
        </label>
      </div>
    </div>
  </div>

  <div className="footer-sidebar">
    <div className="pb-3 pb-md-4 d-flex align-items-center justify-content-between">
      <h3 className="mb-0">Total:</h3>
      <h2 className="mb-0 font-bold">$6.630.153</h2>
    </div>

    <button className="btn btn-primary font-18 px-6 w-100">
      Iniciar compra
    </button>
  </div>
</div>

  );
}
