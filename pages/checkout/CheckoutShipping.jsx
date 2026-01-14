import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../src/hooks/useCart";
import { useRef, useState, useEffect } from "react";

import HeaderCheckOut from "./components/HeaderCheckOut";
import SteppersCheck from "./components/SteppersCheck";

export default function CheckoutShipping() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [validated, setValidated] = useState(false);

  const {
    cart,
    shipping,
    shippingCost,
    deliveryType,
    setDeliveryType,
    setShipping,
  } = useCart();

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formRef.current.checkValidity()) {
      setValidated(true);
      return;
    }

    navigate("/checkout/payment");
  };

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * (p.quantity || 1),
    0
  );

  const total = subtotal + shippingCost;

  /* ================= STICKY SUMMARY ================= */
  const summaryRef = useRef(null);
  const summaryWrapperRef = useRef(null);

  useEffect(() => {
    const el = summaryRef.current;
    const wrapper = summaryWrapperRef.current;
    if (!el || !wrapper) return;

    const offset = 120;

    const onScroll = () => {
      if (window.innerWidth <= 960) {
        el.style.position = "static";
        el.style.width = "100%";
        return;
      }

      const initialTop =
        wrapper.getBoundingClientRect().top + window.scrollY;

      if (window.scrollY > initialTop - offset) {
        el.style.position = "fixed";
        el.style.top = `${offset}px`;
        el.style.width = `${wrapper.offsetWidth}px`;
      } else {
        el.style.position = "static";
        el.style.width = "100%";
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <HeaderCheckOut />

      <div className="bg-white pt-3 pb-5">
        <div className="container">

          {/* STEPS */}
          <SteppersCheck step={2} />

          <div className="row mt-4">

            {/* ================= LEFT ================= */}
            <div className="col-lg-8">

              <form
                ref={formRef}
                className={`needs-validation ${validated ? "was-validated" : ""}`}
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="card shadow-none bg-light-md p-4 mb-4">
                  <h2 className="h3 font-bold text-black mb-4">Datos de entrega</h2>

                  <div className="row">

                    <div className="col-md-3 mb-3">
                      <label className="form-label">Código Postal *</label>
                      <input type="text" className="form-control" required />
                    </div>

                    <div className="col-md-7 mb-3">
                      <label className="form-label">Calle *</label>
                      <input type="text" className="form-control" required />
                    </div>

                    <div className="col-md-2 mb-3">
                      <label className="form-label">Número *</label>
                      <input type="text" className="form-control" required />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tipo de domicilio</label>
                      <select className="form-select">
                        <option>Casa</option>
                        <option>Departamento</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Piso / Departamento *
                      </label>
                      <input type="text" className="form-control" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Provincia</label>
                      <select className="form-select">
                        <option>Buenos Aires</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ciudad</label>
                      <select className="form-select">
                        <option>Seleccionar</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ================= TIPO DE ENTREGA ================= */}
                <div className="card shadow-none bg-light-md p-4 mb-4">
                  <h2 className="h3 font-bold text-black mb-4">Tipo de Entrega</h2>
                  <div class="alert alert-warning  mb-6" role="alert">
                    <h4 className="font-bold mb-2"><span className="font-bold mb-1">Importante</span> </h4>
                    <p className="font-14 mb-0"><b>Retiro en sucursal</b>: sólo podrá retirar la compra el titular de la tarjeta. Si pagás con 2 tarjetas, deberá presentarse quien abonó el mayor monto.</p>
                  </div>

                  <p className="font-bold font-14 text-black mb-2">
                     Envío a Domicilio
                  </p>

                  <label
                    className={`delivery-card w-100 ${
                      deliveryType === "delivery" && shipping === "standard"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={
                        deliveryType === "delivery" &&
                        shipping === "standard"
                      }
                      onChange={() => {
                        setDeliveryType("delivery");
                        setShipping("standard");
                      }}
                    />
                    <div className="delivery-indicator">
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <div className="delivery-content">
                      <span className="delivery-title">
                        Envío Grátis
                      </span>
                      <span className="delivery-desc">
                        Llega entre 3 y 5 días hábiles
                      </span>
                    </div>
                  </label>

                  <label
                    className={`delivery-card w-100 ${
                      deliveryType === "delivery" && shipping === "express"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={
                        deliveryType === "delivery" &&
                        shipping === "express"
                      }
                      onChange={() => {
                        setDeliveryType("delivery");
                        setShipping("express");
                      }}
                    />
                    <div className="delivery-indicator">
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <div className="delivery-content">
                      <span className="delivery-title">Envío Express</span>
                      <span className="delivery-desc">
                        Llega hoy · $25.500
                      </span>
                    </div>
                  </label>

                  <p className="font-bold font-14 text-black mt-4 mb-2">
                    Retirar en local
                  </p>

                  <label
                    className={`delivery-card ${
                      deliveryType === "pickup" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryType === "pickup"}
                      onChange={() => {
                        setDeliveryType("pickup");
                        setShipping("standard");
                      }}
                    />
                    <div className="delivery-indicator">
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <div className="delivery-content">
                      <span className="delivery-title">
                        Ketea Ramos Mejía
                      </span>
                      <span className="delivery-desc">
                        Cnel. Brandsen 2230<br />
                        Lun a Vie · 9 a 18 hs
                      </span>
                    </div>
                  </label>
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/checkout">
                    <i className="bi bi-arrow-left"></i> Volver
                  </Link>

                  <button type="submit" className="btn btn-primary btn-sm font-16 px-6 order-1 order-md-2 mb-5 mb-md-0">
                    Continuar
                  </button>
                </div>
              </form>
            </div>

            {/* ================= RIGHT SUMMARY ================= */}
            <div className="col-lg-4 d-none d-lg-block">
              <div ref={summaryWrapperRef}>
                  <div ref={summaryRef} className="summary-js-sticky">

                    <div className="bg-white rounded border px-3 pt-4 pb-5 py-md-4 px-md-4 mb-3">
                      <div className="mb-5 border-bottom pb-2">
                        <h4 className="font-bold">Detalle de la compra</h4>
                      </div>

                      {/* LISTA DEL CARRITO */}
                      {cart.length === 0 && (
                        <p className="text-muted">No hay productos en el carrito.</p>
                      )}

                      {cart.map((product) => (
                        <div key={product.id} className="border-bottom pb-4 mb-4">
                          <div className="media">
                            <div className="position-relative max-width-10 w-100 me-3">
                              <img
                                className="img-fluid"
                                src={product.image}
                                alt={product.title}
                              />
                              <span className="badge badge-sm badge-primary badge-pos rounded-circle">
                                {product.quantity || 1}
                              </span>
                            </div>

                            <div className="media-body">
                              <h2 className="h6 font-light">{product.title}</h2>
                              <div className="mt-1">
                                ${product.price.toLocaleString("es-AR")}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* SUBTOTALES */}
                      <div className="border-bottom pb-2 mb-4">

                        <div className="media align-items-center mb-3">
                          <span className="text-dark font-15 me-3">
                            Producto(s) ({cart.length})
                          </span>
                          <div className="media-body text-end">
                            <span className="text-dark">
                              $
                              {cart
                                .reduce(
                                  (acc, p) => acc + p.price * (p.quantity || 1),
                                  0
                                )
                                .toLocaleString("es-AR")}
                            </span>
                          </div>
                        </div>

                        {/* MÉTODO DE ENVÍO */}
                        <div className="media align-items-center mb-3">
                          <span className="text-dark font-15 me-3">
                            Método de envío
                          </span>
                          <div className="media-body text-end">
                            <span className="text-dark font-15">
                              {deliveryType === "pickup"
                                ? "Retiro en el local"
                                : shipping === "express"
                                ? "Envío Express"
                                : "Envío Gratis"}
                            </span>
                          </div>
                        </div>

                        {/* COSTO DE ENVÍO SOLO EXPRESS */}
                        {deliveryType === "delivery" && shipping === "express" && (
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-dark font-15">
                              Costo de envío
                            </span>
                            <span className="text-dark">$25.500</span>
                          </div>
                        )}

                      </div>

                      {/* TOTAL */}
                      <div className="media align-items-center">
                        <h4 className="h4 font-medium mb-0 me-3">Total</h4>
                        <div className="media-body text-end">
                          <span className="h3 font-bold text-dark">
                            ${total.toLocaleString("es-AR")}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
