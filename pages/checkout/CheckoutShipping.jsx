import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useRef, useState, useEffect } from "react";

import HeaderCheckOut from "./components/HeaderCheckOut";
import SteppersCheck from "./components/SteppersCheck";

import { useCheckout } from "@/context/CheckoutContext";

export default function CheckoutShipping() {
  const { checkoutData, setCheckoutData } = useCheckout();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const [summaryOpen, setSummaryOpen] = useState(false);

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

    const form = formRef.current;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      setShowAlert(true);

      // opcional: scroll al inicio del formulario
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setShowAlert(false);
    navigate("/checkout/pago");
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


 const toggleSummary = () => {
  setSummaryOpen(prev => !prev);
};

  return (
    <>
      <HeaderCheckOut />



    {/* <!- Summary Mobile --> */}
    <div className={`summary d-block d-md-none fixed sticky ${summaryOpen ? "open" : ""}`}>
      <div
        className="summary-container"
        role="button"
        onClick={toggleSummary}
      >
        <span className="summary-title pull-left">
          <span className="summary-arrow summary-arrow-rounded">
            <i className={`bi ${summaryOpen ? "bi-arrow-up-circle" : "bi-arrow-down-circle"}`} />
          </span>
          <span className="small ps-1">
            {summaryOpen ? "Ocultar detalles" : "Ver detalles de mi compra"}
          </span>
        </span>

        <span className="summary-total font-bold-xl font-16">
          ${total.toLocaleString("es-AR")}
        </span>
      </div>

      <div className="summary-details bg-white">
          <div>
            <div  className="bg-white px-3 pt-4 pb-5 py-md-5 px-md-5 mb-0">

            {/* Lista dinámica del carrito */}
            {cart.length === 0 && (
              <p className="text-muted">No hay productos en el carrito.</p>
            )}

            {cart.map((product) => (
              <div key={product.id} className="border-bottom pb-3 mb-3">
                <div className="d-flex align-items-start">
                  <div className="position-relative me-3" style={{ width: 60 }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="img-fluid rounded"
                    />
                    <span className="badge bg-primary position-absolute top-0 start-100 translate-middle rounded-circle">
                      {product.quantity || 1}
                    </span>
                  </div>

                  <div className="flex-grow-1">
                    <p className="mb-1 font-14">{product.title}</p>
                    <small className="text-muted">
                      ${product.price.toLocaleString("es-AR")}
                    </small>
                  </div>
                </div>
              </div>
            ))}


              {/* SUBTOTALS */}
              <div className="border-bottom pb-4 mb-4">
                <div className="media align-items-center mb-3">
                  <h3 className="text-dark font-15">
                    Item subtotal ({cart.length})
                  </h3>
                  <div className="media-body text-right">
                    <span className="font-medium text-dark">
                      $
                      {cart
                        .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0)
                        .toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <div className="media align-items-center mb-3">
                    <h4 className="text-dark font-15">Método de envío</h4>

                    <div className="media-body text-end">
                      <span className="font-medium text-dark font-15">
                        {shipping === "express" ? "Express" : "Grátis"}
                      </span>
                    </div>
                  </div>
                  {shipping === "express" && (
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-dark font-15">
                        Costo de envío
                      </span>
                      <span className="font-medium text-dark">
                        $25500
                      </span>
                    </div>
                  )}


              </div>

              {/* TOTAL */}
              <div className="media align-items-center">
                <h4 className="h4 font-bold mb-0 me-3">Total</h4>
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
    {/* ./ Summary Mobile  */}         






      <div className="bg-light-medium bg-white-xs pt-3 pb-5">
        <div className="container">

          {/* STEPS */}
          <SteppersCheck />

          <div className="row mt-4">

            {/* ================= LEFT ================= */}
            <div className="col-lg-8">

              <form
                ref={formRef}
                className={`needs-validation ${validated ? "was-validated" : ""}`}
                noValidate
                onSubmit={handleSubmit}
              >

              {showAlert && (
                <div className="alert alert-danger font-medium mb-3 font-15" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-1 mt-1"></i> <strong>Revisá los datos del formulario.</strong> Hay campos obligatorios incompletos o incorrectos.
                </div>
              )}

                <div className="card shadow-none py-4 px-0 px-md-4 mb-md-4">
                  <h2 className="h3 font-bold text-black mb-4">Datos de entrega</h2>

                  <div className="row">

                    <div className="col-md-8 mb-3">
                      <label className="form-label">Calle *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={checkoutData.shippingAddress.street}
                        onChange={(e) =>
                          setCheckoutData(prev => ({
                            ...prev,
                            shippingAddress: {
                              ...prev.shippingAddress,
                              street: e.target.value
                            }
                          }))
                        }
                      />
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                      <label className="form-label">Número *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={checkoutData.shippingAddress.number}
                        onChange={(e) =>
                          setCheckoutData(prev => ({
                            ...prev,
                            shippingAddress: {
                              ...prev.shippingAddress,
                              number: e.target.value
                            }
                          }))
                        }
                      />
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                      <label className="form-label">Código Postal *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={checkoutData.shippingAddress.zip}
                        onChange={(e) =>
                          setCheckoutData(prev => ({
                            ...prev,
                            shippingAddress: {
                              ...prev.shippingAddress,
                              zip: e.target.value
                            }
                          }))
                        }
                      />
                    </div>

                    <div className="col-7 col-md-6 mb-3">
                      <label className="form-label">Tipo de domicilio *</label>
                      <select
                        className="form-select"
                        required
                        value={checkoutData.shippingAddress.type}
                        onChange={(e) =>
                          setCheckoutData(prev => ({
                            ...prev,
                            shippingAddress: {
                              ...prev.shippingAddress,
                              type: e.target.value
                            }
                          }))
                        }
                      >
                        <option value="">Seleccionar</option>
                        <option value="house">Casa</option>
                        <option value="apartment">Depto.</option>
                      </select>
                      <div className="invalid-feedback">
                        Seleccioná una opción.
                      </div>
                    </div>

                    <div className="col-5 col-md-6 mb-3">
                      <label className="form-label">Piso / Depto.</label>
                      <input
                        type="text"
                        className="form-control"
                        value={checkoutData.shippingAddress.floor || ""}
                        onChange={(e) =>
                          setCheckoutData(prev => ({
                            ...prev,
                            shippingAddress: {
                              ...prev.shippingAddress,
                              floor: e.target.value
                            }
                          }))
                        }
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Provincia *</label>
                      <select
                        className="form-select"
                        required
                        value={checkoutData.shippingAddress.province}
                        onChange={(e) =>
                          setCheckoutData(prev => ({
                            ...prev,
                            shippingAddress: {
                              ...prev.shippingAddress,
                              province: e.target.value
                            }
                          }))
                        }
                      >
                        <option value="">Seleccionar provincia</option>
                        <option value="BA">Buenos Aires</option>
                        <option value="CABA">CABA</option>
                      </select>
                      <div className="invalid-feedback">
                        Seleccioná una provincia.
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ciudad *</label>
                      <select
                        className="form-select"
                        required
                        value={checkoutData.shippingAddress.city}
                        onChange={(e) =>
                          setCheckoutData(prev => ({
                            ...prev,
                            shippingAddress: {
                              ...prev.shippingAddress,
                              city: e.target.value
                            }
                          }))
                        }
                      >
                        <option value="">Seleccionar ciudad</option>
                        <option value="CABA">CABA</option>
                        <option value="Haedo">Haedo</option>
                        <option value="Moron">Morón</option>
                        <option value="RamosMejia">Ramos Mejía</option>
                      </select>
                      <div className="invalid-feedback">
                        Seleccioná una ciudad.
                      </div>
                    </div>

                  </div>
                </div>

                {/* ================= TIPO DE ENTREGA ================= */}
                <div className="card shadow-none py-4 px-0 px-md-4 mb-md-4">
                  <h2 className="h3 font-bold text-black mb-3">Tipo de Entrega</h2>
                  <div class="alert alert-warning mb-4" role="alert">
                    <p className="font-13 font-medium mb-0"><b>Retiro en sucursal</b>: sólo podrá retirar la compra el titular de la tarjeta. Si pagás con 2 tarjetas, deberá presentarse quien abonó el mayor monto.</p>
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
                <div className="d-flex justify-content-between align-items-center mb-10 mb-md-0 mt-4">
                  <Link to="/checkout">
                    <i className="bi bi-arrow-left"></i> Regresar
                  </Link>

                  <button type="submit" className="btn btn-primary btn-sm font-16 px-6 order-1 order-md-2 mb-0">
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
                        <h4 className="font-bold">Resumen de la compra</h4>
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
                              <span className="badge badge-sm bg-primary badge-pos rounded-circle">
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
                            Producto ({cart.length})
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
