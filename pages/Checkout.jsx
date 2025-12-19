import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../src/hooks/useCart";
import { useRef, useState, useEffect } from "react";

import StepsCheckout from "./checkout/SteppersCheck";



export default function Checkout() {
const summaryRef = useRef(null);
const summaryWrapperRef = useRef(null);
useEffect(() => {
  const el = summaryRef.current;
  const wrapper = summaryWrapperRef.current;
  if (!el || !wrapper) return;

  const offset = 120;
  const initialTop = wrapper.getBoundingClientRect().top + window.scrollY;

  const onScroll = () => {
    if (window.scrollY > initialTop - offset) {
      el.style.position = "fixed";
      el.style.top = `${offset}px`;
      el.style.width = `${wrapper.offsetWidth}px`;
      el.style.maxWidth = "362px"; 
    } else {
      el.style.position = "static";
      el.style.width = "auto";
      el.style.maxWidth = "none";
    }
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);


const { cart, shipping, shippingCost } = useCart();
  const navigate = useNavigate();

  const formRef = useRef(null);
  const [validated, setValidated] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();

  const form = formRef.current;

  if (!form.checkValidity()) {
    e.stopPropagation();
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



  return (
    <>
    <header className="py-2 border-bottom sticky-nav bg-white">
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* LOGO */}
        <div>
        <Link to="/" className="navbar-brand">
          <img src="assets/img/logo/logo.svg" alt="Logo" height="60" />
        </Link>
        </div>

        <div>
          <div className="security-seal">
            <span className="d-inline-block">
              <img alt="Compra Segura" src="https://checkout-front.tiendanube.com/production/2.3.619/_next/server/static/img/safe-shopping.svg" className="security-seal-badge" /></span>
              <span className="d-inline-block text-left">
                <p className="m-none text-uppercase text-semi-bold mb-0"><b>Compra Segura</b></p>
              <p className="m-none text-uppercase mb-0">100% Protegido</p></span>
          </div>
        </div>

        </div>
    </header>

    <div className="bg-light">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <StepsCheckout />
          </div>
        </div>
      </div>
    </div>



    <div className="bg-light">
      <div className="container">
        <div className="row">

          {/* ORDER SUMMARY – RIGHT COLUMN */}
          <div className="col-lg-4 order-lg-2 mb-4 mb-lg-0">
            <div className="ps-xl-4">
              <div ref={summaryWrapperRef}>
              <div  ref={summaryRef} className="bg-white border rounded px-4 pt-4 pb-5 py-md-5 px-md-5 mb-4 summary-js-sticky">

                {/* Title */}
                <div className="border-bottom pb-4 mb-4">
                  <h2 className="h4 mb-0">Resumen del pedido</h2>
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
                        <span className="badge badge-sm badge-primary badge-pos rounded-circle">
                          {product.quantity || 1}
                        </span>
                      </div>

                      <div className="media-body">
                        <h2 className="h6">{product.title}</h2>

                        {product.gender && (
                          <div className="text-secondary font-size-1">
                            <span>Gender: </span>{product.gender}
                          </div>
                        )}

                        {product.color && (
                          <div className="text-secondary font-size-1">
                            <span>Color: </span>{product.color}
                          </div>
                        )}

                        {product.size && (
                          <div className="text-secondary font-size-1">
                            <span>Size: </span>{product.size}
                          </div>
                        )}

                        <div className="font-medium text-dark mt-2">
                          ${product.price.toLocaleString("es-AR")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* SUBTOTALS */}
                <div className="border-bottom pb-4 mb-4">
                  <div className="media align-items-center mb-3">
                    <h3 className="text-secondary font-size-1 mb-0 me-3">
                      Item subtotal ({cart.length})
                    </h3>
                    <div className="media-body text-right">
                      <span className="font-medium text-secondary">
                        $
                        {cart
                          .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0)
                          .toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>

                  <div className="media align-items-center mb-3">
                      <h4 className="text-secondary font-size-1 mb-0 me-3">Método de envío</h4>

                      <div className="media-body text-end">
                        <span className="font-medium text-secondary font-15">
                          {shipping === "express" ? "Express" : "Grátis"}
                        </span>
                      </div>
                    </div>
                    {shipping === "express" && (
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-secondary font-size-1">
                          Costo de envío
                        </span>
                        <span className="font-medium text-dark">
                          $25.500
                        </span>
                      </div>
                    )}


                </div>

                {/* TOTAL */}
                <div className="media align-items-center mb-0 mb-md-4">
                  <h4 className="h3 font-bold mb-0 me-3">Total</h4>
                  <div className="media-body text-right">
                    <span className="h3 font-bold text-dark">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN (checkout actions, forms...) */}
          <div className="col-lg-8 order-lg-1">

            <div className="card border shadow-none mb-5">
              <div className="card-body px-4 pt-5 pb-5 py-md-5 px-md-5">
                <form
                  ref={formRef}
                  className={`needs-validation ${validated ? "was-validated" : ""}`}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="border-bottom pb-5 mb-7">

                    <div className="mb-4">
                      <h2 className="h3">Datos del destinatario</h2>
                    </div>

                    <div className="row">

                      <div className="col-md-6 mb-3 mb-md-4">
                        <label className="form-label">Nombre *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          required
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
                          name="lastName"
                          required
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
                          name="emailAddress"
                          required
                        />
                        <div className="invalid-feedback">
                          Ingresá un email válido.
                        </div>
                      </div>

                      <div className="col-md-6 mb-3 mb-md-4">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-8 mb-3">
                        <label className="form-label">Dirección *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="streetAddress"
                          required
                        />
                        <div className="invalid-feedback">
                          Ingresá tu dirección.
                        </div>
                      </div>

                      <div className="col-md-4 mb-3 mb-md-4">
                        <label className="form-label">Depto.</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-5 mb-3 mb-md-4">
                        <label className="form-label">Provincia *</label>
                        <select className="form-select" required>
                          <option value="">Seleccionar</option>
                          <option value="Buenos Aires">Buenos Aires</option>
                          <option value="Córdoba">Córdoba</option>
                          {/* resto de provincias */}
                        </select>
                        <div className="invalid-feedback">
                          Seleccioná una provincia.
                        </div>
                      </div>

                      <div className="col-md-4 mb-3 mb-md-4">
                        <label className="form-label">Ciudad *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          required
                        />
                        <div className="invalid-feedback">
                          Ingresá tu ciudad.
                        </div>
                      </div>


                      <div className="col-md-3 mb-3 mb-md-4">
                        <label className="form-label">Código Postal *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="postcode"
                          required
                        />
                        <div className="invalid-feedback">
                          Ingresá un código postal.
                        </div>
                      </div>
                    </div>

                    <div className="col-12 pt-3">
                        <div className="js-form-message">

                            <label className="d-flex align-items-start gap-2 mb-3"> 
                              <input className="form-check-input flex-shrink-0 mt-0" type="checkbox" value="" /> 
                              <small className="d-block text-body-secondary"> Mi información de facturación y envío es la misma.</small>
                            </label>

                            <label className="d-flex align-items-start gap-2"> 
                              <input className="form-check-input flex-shrink-0 mt-0" type="checkbox" value="" /> 
                              <small className="d-block text-body-secondary">Por favor, envíenme correos electrónicos con ofertas exclusivas, información y novedades de nuevos productos </small>
                            </label>
                        </div>
                      </div>


                  </div>


                  {/* BOTÓN FINAL */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mt-md-8">
                    <Link to="/cart" className="order-2 order-md-1">
                      <small className="bi bi-arrow-left me-1"></small> Regresar a mi Carrito
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-primary btn-sm rounded-pill px-6 order-1 order-md-2 mb-5 mb-md-0 mt-5 mt-md-0 btn-checkout"
                    >
                        Continuar al pago
                    </button>
                  </div>


                </form>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    </div>
    </>
  );
}
