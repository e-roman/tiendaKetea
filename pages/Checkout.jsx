import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../src/hooks/useCart";
import { useRef, useState, useEffect } from "react";

import HeaderCheckOut from "./checkout/HeaderCheckOut";
import SteppersCheck from "./checkout/SteppersCheck";


export default function Checkout() {
const [summaryOpen, setSummaryOpen] = useState(false);

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
      <HeaderCheckOut />



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


        <div className="summary-details">
            <div ref={summaryWrapperRef}>
            <div  ref={summaryRef} className="bg-white rounded border px-3 pt-4 pb-5 py-md-5 px-md-5 mb-4 summary-js-sticky">


              {/* Lista dinámica del carrito */}
              {cart.length === 0 && (
                <p className="text-muted">No hay productos en el carrito.</p>
              )}

              {/* SUBTOTALS */}
              <div className="border-bottom pb-2 mb-4">
                <div className="media align-items-center mb-3">
                  <span className="text-dark 15 mb-0 me-3">
                    Producto(s) ({cart.length})
                  </span>
                  <div className="media-body text-right">
                    <span className=" text-dark">
                      $
                      {cart
                        .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0)
                        .toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <div className="media align-items-center mb-3">
                    <span className="text-dark 15 mb-0 me-3">Método de envío</span>
                    <div className="media-body text-end">
                      <span className="text-dark font-15">
                        {deliveryType === "pickup"
                          ? "Retiro en local"
                          : shipping === "express"
                          ? "Envío Express"
                          : "Envío estándar"}
                      </span>
                    </div>
                  </div>
                  {shipping === "express" && (
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-dark 15">
                        Costo de envío
                      </span>
                      <span className=" text-dark">
                        $25.500
                      </span>
                    </div>
                  )}


              </div>

              {/* TOTAL */}
              <div className="media align-items-center mb-3">
                <h4 className="h4 font-bold mb-0 me-3">Total</h4>
                <div className="media-body text-right">
                  <span className="h3 font-bold text-dark">
                    ${total.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>

                <div className="summary-coupon mt-5 pt-3 border-top">
                  <form>
                    <label className="font-bold text-dark pb-2" htmlFor="cuponDescuento">¿Tenés un cupón de descuento?</label>
                    <div className="d-flex gap-1">
                      <input type="email" className="form-control rounded-1" name="email" id="cuponDescuento" placeholder="Ingresa código del cupón"/>
                      <button className="btn btn-primary rounded-1 py-2 font-15" type="submit" id="subscribeButtonExample3">Aplicar</button>
                    </div>
                  </form>
                </div>


            </div>
            </div>
        </div>
      </div>






      {/*Col Right Summary */}
      <div className="bg-light-medium bg-white-xs pt-2 pt-md-4 space-bottom-md-3">

        <div className="container px-xs-0">


        <div>
          <div className="container pb-4 ">
            <div className="row">
              <div className="col-lg-8 ps-0">
                <SteppersCheck />
              </div>
            </div>
          </div>
        </div>



          <div className="row">

            {/* ORDER SUMMARY – RIGHT COLUMN */}
            <div className="col-lg-4 order-lg-2 mb-4 mb-lg-0 d-none d-md-block">
              <div>
                <div ref={summaryWrapperRef}>
                <div  ref={summaryRef} className="bg-white rounded border px-3 pt-4 pb-5 py-md-5 px-md-4 mb-4 summary-js-sticky">

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
                          <h2 className="h6 font-light">{product.title}</h2>
                          <div className="text-dark font-bold mt-1">
                            ${product.price.toLocaleString("es-AR")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* SUBTOTALS */}
                  <div className="border-bottom pb-2 mb-4">
                    <div className="media align-items-center mb-3">
                      <span className="text-dark font-15 mb-0 me-3">
                        Producto(s) ({cart.length})
                      </span>
                      <div className="media-body text-right">
                        <span className=" text-dark">
                          $
                          {cart
                            .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0)
                            .toLocaleString("es-AR")}
                        </span>
                      </div>
                    </div>

                    <div className="media align-items-center mb-3">
                        <span className="text-dark font-15 mb-0 me-3">Método de envío</span>
                        <div className="media-body text-end">
                          <span className="text-dark font-15">
                            {deliveryType === "pickup"
                              ? "Retiro en local"
                              : shipping === "express"
                              ? "Envío Express"
                              : "Envío estándar"}
                          </span>
                        </div>
                      </div>
                      {shipping === "express" && (
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-dark font-15">
                            Costo de envío
                          </span>
                          <span className=" text-dark">
                            $25.500
                          </span>
                        </div>
                      )}


                  </div>

                  {/* TOTAL */}
                  <div className="media align-items-center mb-3">
                    <h4 className="h4 font-bold mb-0 me-3">Total</h4>
                    <div className="media-body text-right">
                      <span className="h3 font-bold text-dark">
                        ${total.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>


                  <div className="summary-coupon mt-5 pt-3 border-top">
                    <form>
                      <label className="font-bold text-dark pb-2" htmlFor="cuponDescuento">¿Tenés un cupón de descuento?</label>
                      <div className="d-flex gap-1">
                        <input type="email" className="form-control rounded-1" name="email" id="cuponDescuento" placeholder="Ingresa código del cupón"/>
                        <button className="btn btn-primary rounded-1 py-2 font-15" type="submit" id="subscribeButtonExample3">Aplicar</button>
                      </div>
                    </form>
                  </div>


                </div>
                </div>
              </div>
            </div>







            {/* LEFT COLUMN (checkout actions, forms...) */}
            <div className="col-lg-8 order-lg-1">



              <form
                ref={formRef}
                className={`needs-validation ${validated ? "was-validated" : ""}`}
                noValidate
                onSubmit={handleSubmit}
              >
                  <div className="card shadow-none border mb-5">
                    <div className="card-body px-3 pt-5 pb-5 py-md-5 px-md-5">



                      <div className="border-bottom pb-4 mb-5">
                        <h2 className="h3 font-bold mb-4">Datos de contacto</h2>

                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" placeholder="email@ejemplo.com" />
                        </div>

                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" className="form-check-input mt-0" />
                          <p className="mb-0">Quiero recibir ofertas y novedades por email</p>
                        </label>
                      </div>



                      <div className="pb-4">

                          <p className="small text-black mb-2">
                            <i className="bi bi-truck f-icons-18"></i> Envío a Domicilio
                          </p>

                          <div>
                            {/* ENVÍO STANDARD */}
                            <label
                              className={`delivery-card w-100 ${
                                deliveryType === "delivery" && shipping === "standard" ? "active" : ""
                              }`}
                            >
                              <input
                                type="radio"
                                name="delivery"
                                checked={deliveryType === "delivery" && shipping === "standard"}
                                onChange={() => {
                                  setDeliveryType("delivery");
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
                              className={`delivery-card w-100 ${
                                deliveryType === "delivery" && shipping === "express" ? "active" : ""
                              }`}
                            >

                              <input
                                type="radio"
                                name="delivery"
                                checked={deliveryType === "delivery" && shipping === "express"}
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
                                  Tiene un costo de $25.500 y llega hoy
                                </span>
                              </div>
                            </label>
                          </div>

                          <p className="small text-black mt-4 mb-2">
                            <i className="bi bi-geo-alt"></i> Retirar en local
                          </p>

                          {/* PICKUP */}
                          <div>
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
                                setShipping("standard"); // forzado, no hay costo
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






                        <div className="border-bottom pb-5 mb-7">

                          <div className="mb-4">
                            <h2 className="h3 font-bold">Datos de facturación</h2>
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
                              <label className="form-label">Teléfono *</label>
                              <input type="text" className="form-control" name="phoneNumber" required/>
                              <div className="invalid-feedback">
                                Ingresá su Teléfono.
                              </div>
                            </div>

                            <div className="col-md-8 col-md-8 mb-3">
                              <label className="form-label">Calle *</label>
                              <input
                                type="text"
                                className="form-control"
                                name="streetAddress"
                                required
                              />
                              <div className="invalid-feedback">
                                Ingresá el nombre de la Calle.
                              </div>
                            </div>

                            <div className="col-8 col-md-2 mb-3 mb-md-4">
                              <label className="form-label">Número *</label>
                              <input type="text" className="form-control" name="streetNumber" required/>
                              <div className="invalid-feedback">
                                Ingresá el Número de la calle
                              </div>
                            </div>

                            <div className="col-4 col-md-2 mb-3 mb-md-4">
                              <label className="form-label">Depto.</label>
                              <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-6 mb-3 mb-md-4">
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

                            <div className="col-md-2 mb-3 mb-md-4">
                              <label className="form-label">CPA *</label>
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

                            <div className="col-md-4 mb-3 mb-md-4">
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


                          </div>

                          <div className="col-12 pt-3">
                              <div className="js-form-message">

                                  <label className="d-flex align-items-center gap-2 mb-3"> 
                                    <input className="form-check-input flex-shrink-0 mt-0" type="checkbox" value="" /> 
                                    <p className="d-block text-body-secondary mb-0"> Mi información de facturación y envío es la misma.</p>
                                  </label>
                              </div>
                            </div>


                        </div>



                      
                    </div>
                  </div>
                  


                  {/* BOTÓN FINAL */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mt-md-4">
                    <Link to="/cart" className="order-2 order-md-1">
                      <small className="bi bi-arrow-left me-1"></small> Regresar a mi Carrito
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-primary btn-sm font-16 px-6 order-1 order-md-2 mb-5 mb-md-0 mt-5 mt-md-0 btn-checkout"
                    >
                        Continuar al pago
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
