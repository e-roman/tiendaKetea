import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@//hooks/useCart";
import { useRef, useState, useEffect } from "react";

import HeaderCheckOut from "./checkout/components/HeaderCheckOut";
import SteppersCheck from "./checkout/components/SteppersCheck";

import { useCheckout } from "@/context/CheckoutContext";

export default function Checkout() {
  const { checkoutData, setCheckoutData } = useCheckout();
const [summaryOpen, setSummaryOpen] = useState(false);

const summaryRef = useRef(null);
const summaryWrapperRef = useRef(null);


useEffect(() => {
  const el = summaryRef.current;
  const wrapper = summaryWrapperRef.current;
  if (!el || !wrapper) return;

  const offset = 20;

  const onScroll = () => {
    if (window.innerWidth <= 960) {
      el.style.position = "static";
      el.style.top = "auto";
      el.style.width = "100%";
      return;
    }

    const initialTop =
      wrapper.getBoundingClientRect().top + window.scrollY;

    if (window.scrollY > initialTop - offset) {
      const width = wrapper.getBoundingClientRect().width;

      el.style.position = "fixed";
      el.style.top = `${offset}px`;
      el.style.width = `${width}px`;
    } else {
      el.style.position = "static";
      el.style.top = "auto";
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

const {
  cart,
  shipping,
  setShipping,
  deliveryType,
  setDeliveryType,
  shippingCost,
} = useCart();

  const navigate = useNavigate();

  const formRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
    navigate("/checkout/entrega");
  };

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * (p.quantity || 1),
    0
  );

  const total = subtotal + shippingCost;



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




      {/*Col Right Summary */}
      <div className="bg-light-medium bg-white-xs pt-3 pb-5">

        <div className="container">


          {/* STEPS */}
          <SteppersCheck />





        <div className="row mt-4">

          {/* ORDER SUMMARY – RIGHT COLUMN */}
          <div className="col-lg-4 order-lg-2 mb-4 mb-lg-0 d-none d-md-block">
            <div ref={summaryWrapperRef}>
              <div ref={summaryRef} className="summary-js-sticky">

                <div className="bg-white rounded border px-3 pt-4 pb-5 py-md-4 px-md-4 mb-3">
                  <div className="mb-5 border-bottom pb-2">
                    <h4 className="font-bold">Resumen de la compra</h4>
                  </div>

                  {/* Lista dinámica del carrito */}
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
                          <div className=" mt-1">
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
                        Producto(s) <b>({cart.length})</b>
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

                    <div className="media align-items-center mb-3">
                      <span className="text-dark font-15 me-3">
                        Método de envío
                      </span>
                      <div className="media-body text-end">
                        <span className="text-dark font-15">
                          {deliveryType === "pickup"
                            ? "Retiro en local"
                            : shipping === "express"
                            ? "Envío Express"
                            : "Envío Gratis"}
                        </span>
                      </div>
                    </div>

                    {shipping === "express" && (
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




          {/* LEFT COLUMN */}
          <div className="col-lg-8 order-lg-1 pe-md-4">

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

  {/* ================= DATOS DE CONTACTO ================= */}
  <div className="border-bottom pb-4 mb-5">
    <h2 className="h3 font-bold mb-4">Datos de contacto</h2>

    <div className="mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        placeholder="email@ejemplo.com"
        value={checkoutData.contact.email}
        onChange={(e) =>
          setCheckoutData(prev => ({
            ...prev,
            contact: {
              ...prev.contact,
              email: e.target.value
            }
          }))
        }
      />
    </div>

    <label className="d-flex align-items-center gap-2">
      <input
        type="checkbox"
        className="form-check-input mt-0"
        checked={checkoutData.contact.newsletter}
        onChange={(e) =>
          setCheckoutData(prev => ({
            ...prev,
            contact: {
              ...prev.contact,
              newsletter: e.target.checked
            }
          }))
        }
      />
      <p className="mb-0">
        Quiero recibir ofertas y novedades por email
      </p>
    </label>
  </div>

  {/* ================= DATOS DE FACTURACIÓN ================= */}
  <div>

    <h2 className="h3 font-bold text-black mb-4">
      Datos de facturación
    </h2>

    <div className="row">

      <div className="col-md-6 mb-3 mb-md-4">
        <label className="form-label">Nombre *</label>
        <input
          type="text"
          className="form-control"
          required
          value={checkoutData.billing.name}
          onChange={(e) =>
            setCheckoutData(prev => ({
              ...prev,
              billing: {
                ...prev.billing,
                name: e.target.value
              }
            }))
          }
        />
        <div className="invalid-feedback">
          Ingresá tu nombre.
        </div>
      </div>

      <div className="col-md-6 mb-3 mb-md-4">
        <label className="form-label">Apellido *</label>
        <input
          type="text"
          className="form-control"
          required
          value={checkoutData.billing.lastName}
          onChange={(e) =>
            setCheckoutData(prev => ({
              ...prev,
              billing: {
                ...prev.billing,
                lastName: e.target.value
              }
            }))
          }
        />
        <div className="invalid-feedback">
          Ingresá tu apellido.
        </div>
      </div>

      <div className="col-md-6 mb-3 mb-md-4">
        <label className="form-label">Email *</label>
        <input
          type="email"
          className="form-control"
          required
          value={checkoutData.billing.email}
          onChange={(e) =>
            setCheckoutData(prev => ({
              ...prev,
              billing: {
                ...prev.billing,
                email: e.target.value
              }
            }))
          }
        />
        <div className="invalid-feedback">
          Ingresá un email válido.
        </div>
      </div>

      <div className="col-md-6 mb-3 mb-md-4">
        <label className="form-label">Teléfono *</label>
        <input
          type="text"
          className="form-control"
          required
          value={checkoutData.billing.phone}
          onChange={(e) =>
            setCheckoutData(prev => ({
              ...prev,
              billing: {
                ...prev.billing,
                phone: e.target.value
              }
            }))
          }
        />
        <div className="invalid-feedback">
          Ingresá tu teléfono.
        </div>
      </div>

      <div className="col-md-8 mb-3">
        <label className="form-label">Calle *</label>
        <input
          type="text"
          className="form-control"
          required
          value={checkoutData.billing.street}
          onChange={(e) =>
            setCheckoutData(prev => ({
              ...prev,
              billing: {
                ...prev.billing,
                street: e.target.value
              }
            }))
          }
        />
      </div>

      <div className="col-7 col-md-2 mb-3">
        <label className="form-label">Número *</label>
        <input
          type="text"
          className="form-control"
          required
          value={checkoutData.billing.number}
          onChange={(e) =>
            setCheckoutData(prev => ({
              ...prev,
              billing: {
                ...prev.billing,
                number: e.target.value
              }
            }))
          }
        />
      </div>

      <div className="col-5 col-md-2 mb-3">
        <label className="form-label">Depto.</label>
        <input
          type="text"
          className="form-control"
          value={checkoutData.billing.apartment}
          onChange={(e) =>
            setCheckoutData(prev => ({
              ...prev,
              billing: {
                ...prev.billing,
                apartment: e.target.value
              }
            }))
          }
        />
      </div>

    </div>

    <div className="row">
      <div className="col-12 pt-3">
        <label className="d-flex align-items-center gap-2 mb-3">
          <input
            type="checkbox"
            className="form-check-input mt-0"
            checked={checkoutData.sameAsShipping || false}
            onChange={(e) =>
              setCheckoutData(prev => ({
                ...prev,
                sameAsShipping: e.target.checked
              }))
            }
          />
          <p className="mb-0 text-body-secondary">
            Mi información de facturación y envío es la misma.
          </p>
        </label>
      </div>
    </div>

  </div>

</div>




              {/* BOTÓN FINAL */}
              <div className="d-flex flex-row justify-content-between align-items-center mb-10 mb-md-0 mt-4">
                <Link to="/cart">
                  <small className="bi bi-arrow-left me-1"></small>
                  Regresar <span className="d-none d-inline">a mi Carrito</span>
                </Link>

                <button
                  type="submit"
                  className="btn btn-primary btn-sm font-16 px-6 order-1 order-md-2 mb-0"
                >
                  Continuar
                </button>
              </div>

            </form>
          </div>

        </div>





        </div>

      </div>
    </>
  );
}
