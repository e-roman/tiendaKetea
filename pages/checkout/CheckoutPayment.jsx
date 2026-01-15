import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useRef, useState, useEffect } from "react";

import HeaderCheckOut from "../checkout/components/HeaderCheckOut";
import SteppersCheck from "./components/SteppersCheck";
import OrderSummary from "./components/OrderSummary";



export default function CheckoutPayment() {
  const [paymentMethod, setPaymentMethod] = useState("card");

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

navigate("/checkout/pago-realizado");

};


  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * (p.quantity || 1),
    0
  );

  const total = subtotal + shippingCost;

const toggleSummary = () => {
  setSummaryOpen(prev => !prev);
};

const {
  setShipping,
  deliveryType,
  setDeliveryType,
} = useCart();

  return (
    <>

    <HeaderCheckOut/>
    
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





    <div className="bg-light-medium bg-white-xs pt-2 pt-md-4 space-bottom-md-3">

        <div className="container">


        <div>
          <div className="container pt-4 pb-6 pt-md-0 pb-md-4 ">
            <div className="row">
              <div className="col-lg-8 ps-0">
                <SteppersCheck />
              </div>
            </div>
          </div>
        </div>

        <div className="row">

          {/* ORDER SUMMARY – RIGHT COLUMN */}
          <div className="col-lg-4 order-lg-2 mb-4 mb-lg-0 pt-6 d-none d-md-block ">
            <div className="w-100">
              <div ref={summaryWrapperRef}>

                <div ref={summaryRef} className="summary-js-sticky">
                  <div className="bg-white rounded border px-3 pt-4 pb-5 py-md-4 px-md-4 mb-4">

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
                            <span className="badge badge-sm badge-primary badge-pos rounded-circle">
                              {product.quantity || 1}
                            </span>
                          </div>

                          <div className="media-body">
                            <h2 className="h6">{product.title}</h2>

                            {product.gender && (
                              <div className="text-dark font-size-1">
                                <span>Gender: </span>{product.gender}
                              </div>
                            )}

                            {product.color && (
                              <div className="text-dark font-size-1">
                                <span>Color: </span>{product.color}
                              </div>
                            )}

                            {product.size && (
                              <div className="text-dark font-size-1">
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
                              : "Envío estándar"}
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
          </div>





          {/* LEFT COLUMN Payments Methods*/}
          <div className="col-lg-8 pe-md-4">
            <div className="mb-10 mb-md-0">
                <h4 className="font-bold mb-3">Método de pago</h4>

                {/* ===== MODO ===== */}
                <div className="bg-white border rounded p-3 mb-3">
                  <label className="d-flex align-items-start gap-3 cursor-pointer">
                    <input
                      className="mt-1"
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "modo"}
                      onChange={() => setPaymentMethod("modo")}
                    />
                    <div className="w-100">
                      <div className="d-flex align-items-start justify-content-between w-100 gap-3 cursor-pointer">
                      <h5 className="font-bold mb-0">Pagá con MODO</h5>
                      </div>
                      <span className="font-14 text-dark">
                        Hacé clic en “Pagar con MODO” y pagá con la app de MODO o tu banco en tu celular.
                      </span>

                      <div className="mt-2"><img src="../assets/img/cards/modo.svg" alt="MODO" /></div>
                      
                    </div>
                  </label>

                  {paymentMethod === "modo" && (
                    <div className="mt-4 ms-4 ps-1">
                      <p className="text-muted mb-3">
                        Si estás en una computadora, tené el celular a mano.
                      </p>

                      <Link to="/checkout/pago-realizado" className="btn btn-danger px-5 py-2">
                        Pagar con MODO
                      </Link>
                    </div>
                  )}
                </div>



                {/* ===== MERCADO PAGO ===== */}
                <div className="bg-white border rounded p-3 mb-3">
                  <label className="d-flex align-items-start gap-3 cursor-pointer">
                    <input
                      className="mt-1"
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "mp"}
                      onChange={() => setPaymentMethod("mp")}
                    />
                    <div className="w-100">
                      <div className="d-flex align-items-start justify-content-between w-100 gap-3 cursor-pointer">
                      <h5 className="font-bold mb-0">Pagá con Mercado Pago </h5>
                      </div>
                      
                      <span className="font-14 text-dark">
                        Pagá con dinero en cuenta o tus tarjetas de debito y credito ya precargadas. 
                      </span>
                      <div className="mt-2"><img src="../assets/img/cards/mp2.svg" alt="Mercado Pago" /></div>
                    </div>
                  </label>

                  {paymentMethod === "mp" && (
                    <div className="mt-4 ms-4 ps-1">
                      <Link to="/checkout/pago-realizado" className="btn btn-danger px-5 py-2">
                        Pagar con Mercado Pago
                      </Link>
                    </div>
                  )}
                </div>



                {/* ===== TARJETA ===== */}
                <div className="bg-white border rounded p-3 mb-3">
                  <label className="d-flex align-items-start gap-3 cursor-pointer">
                    <input
                      className="mt-1"
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <div className="w-100">
                      <h5 className="font-bold mb-1">Pagá con tarjetas de crédito, débito o prepagas</h5>
                      <span className="font-14 text-dark">
                        Selecciona la cantidad de cuotas que desees.
                      </span>

                      <div className="mt-2 d-flex gap-2">
                        <div><img src="../assets/img/cards/visa.svg" alt="Visa" /></div>
                        <div><img src="../assets/img/cards/mastercard.svg" alt="Mastercard" /></div>
                        <div><img src="../assets/img/cards/amex.svg" alt="Amex" /></div>
                        <div><img src="../assets/img/cards/argencard.svg" alt="argencard"/></div>
                        <div><img src="../assets/img/cards/naranja.svg" alt="naranja" /></div>
                        <div><img src="../assets/img/cards/cencosud.svg" alt="cencosud" /></div>
                        <div><img src="../assets/img/cards/nativa.svg" alt="Nativa" /></div>
                        <div><img src="../assets/img/cards/cabal.svg" alt="Cabal" /></div>
                      </div>
                    </div>
                  </label>

                {paymentMethod === "card" && (
                  <div className="mt-4 mb-3 mb-md-5 p-3 p-md-5 border rounded mx-md-4 bg-white shadow-sm">
                    <p className="text-dark font-bold mb-4">Ingresá los datos de tu tarjeta</p>

                    {/* Número de tarjeta */}
                    <div className="mb-3">
                      <label className="form-label">Número de tarjeta</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Fecha expiración</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM / YY"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CVV / CVC"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Nombre como aparece en la tarjeta
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej. Francisco Pérez"
                      />
                    </div>

                    {/* SELECT DE CUOTAS */}
                    <div className="mb-6">
                      <label className="form-label">Cuotas disponibles</label>
                      <select className="form-select">
                        <option value="1">Total - $ 769.198,00</option>
                        <option value="2">
                          2 cuotas de $ 396.349,26 con interés de 2.03% mensual
                        </option>
                        <option value="3">
                          3 cuotas de $ 270.106,95 con interés de 2.65% mensual
                        </option>
                        <option value="6">
                          6 cuotas de $ 144.164,39 con interés de 3.46% mensual
                        </option>
                        <option value="12">
                          12 cuotas de $ 81.674,64 con interés de 3.94% mensual
                        </option>
                        <option value="18">
                          18 cuotas de $ 61.256,40 con interés de 4.1% mensual
                        </option>
                      </select>
                    </div>

                    <Link to="/pago-realizado" className="btn btn-danger px-10 w-100 py-2">
                      Pagar
                    </Link>

                  </div>
                )}

                </div>



                {/* ===== EFECTIVO ===== */}
                <div className="bg-white border rounded p-3">
                  <label className="d-flex align-items-start gap-3 cursor-pointer">
                    <input
                      className="mt-1"
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />
                    <div>
                      <h5 className="font-bold mb-1">Efectivo</h5>
                      <span className="font-14 text-dark">
                        Rapipago o Pago Fácil.
                      </span>

                      <div className="d-flex gap-2 mt-2">
                        <img src="../assets/img/cards/pagofacil.svg" alt="pagofacil" />
                        <img src="../assets/img/cards/rapipago.svg" alt="rapipago" />
                      </div>
                    </div>
                  </label>

                  {paymentMethod === "cash" && (
                    <div className="mt-4 ms-4 ps-1">
                      <select className="form-select w-50 mb-3">
                        <option>¿Dónde querés pagar?</option>
                        <option>Rapipago</option>
                        <option>Pago Fácil</option>
                      </select>
                    </div>
                  )}
                </div>

             </div>     

          </div>



          
        </div>
      </div>
    </div>
    </>
  );
}
