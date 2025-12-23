import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../src/hooks/useCart";
import { useRef, useState, useEffect } from "react";

import StepsCheckout from "./SteppersCheck";
import OrderSummary from "./OrderSummary";


export default function CheckoutPayment() {
const [summaryOpen, setSummaryOpen] = useState(false);

const summaryRef = useRef(null);
const summaryWrapperRef = useRef(null);

useEffect(() => {
  const el = summaryRef.current;
  const wrapper = summaryWrapperRef.current;
  if (!el || !wrapper) return;

  const offset = 120;

  const onScroll = () => {
    // No aplicar en responsive
    if (window.innerWidth <= 960) {
      el.style.position = "static";
      el.style.width = "auto";
      el.style.maxWidth = "none";
      return;
    }

    const initialTop =
      wrapper.getBoundingClientRect().top + window.scrollY;

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

navigate("/checkout/payment");

};

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * (p.quantity || 1),
    0
  );

  const total = subtotal + shippingCost;

const toggleSummary = () => {
  setSummaryOpen(prev => !prev);
};

  return (
    <>
    <header className="py-2 border-bottom sticky-nav bg-white">
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* LOGO */}
        <div>
        <Link to="/" className="navbar-brand">
          <img src="../assets/img/logo/logo.svg" alt="Ketea" height="45" />
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
              <div  ref={summaryRef} className="bg-white rounded px-3 pt-4 pb-5 py-md-5 px-md-5 mb-4 summary-js-sticky">

                {/* Title */}
                {/* <div className="border-bottom pb-4 mb-4">
                  <h2 className="h4 mb-0">Resumen del pedido</h2>
                </div> */}

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
                      <h4 className="text-secondary font-size-1 mb-0 me-3">Cósto del envío</h4>

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
                          $25500
                        </span>
                      </div>
                    )}


                </div>

                {/* TOTAL */}
                <div className="media align-items-center mb-3">
                  <h4 className="h3 font-bold mb-0 me-3">Total</h4>
                  <div className="media-body text-right">
                    <span className="h3 font-bold text-dark">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>


                <div className="summary-coupon">
                  <div className="box-discount-coupon-applied">
                      <div className="col-12 text-center">
                        <div id="" className="btn btn-sm btn-outline-dark rounded-pill w-100" tabindex="0" role="button">
                          <span>
                            <svg className="coupon-icon" width="13px" height="13px" viewBox="0 0 1024 1024"><path d="M992.6,564.8L546.7,41.3C502.1-11,426.5-14,377.9,34.6L34.6,377.9C-14,426.5-11,502.1,41.3,546.6l523.4,445.9 c52.4,44.6,134.2,41.3,182.8-7.3l237.7-237.7C1033.9,699,1037.2,617.1,992.6,564.8z M709.5,802.8c-51.6,0-93.3-41.8-93.3-93.3 c0-51.5,41.8-93.3,93.3-93.3s93.3,41.8,93.3,93.3C802.8,761,761,802.8,709.5,802.8z"></path></svg>
                            <span className="text-pre-line ps-2">Agregar cupón de descuento</span>
                          </span>
                        </div>
                      </div>
                  </div>
                </div>


              </div>
              </div>
        </div>
      </div>


    <div className="bg-light">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <StepsCheckout />
          </div>
        </div>
      </div>
    </div>



   <div className="bg-light bg-white-xs">
      <div className="container px-xs-0">
        <div className="row">

          {/* ORDER SUMMARY – RIGHT COLUMN */}
          <div className="col-lg-4 order-lg-2 mb-4 mb-lg-0 d-none d-md-block ">
            <div className="ps-xl-4">
              <div ref={summaryWrapperRef}>
              <div  ref={summaryRef} className="bg-white rounded px-3 pt-4 pb-5 py-md-5 px-md-5 mb-4 summary-js-sticky">

                {/* Title */}
                {/* <div className="border-bottom pb-4 mb-4">
                  <h2 className="h4 mb-0">Resumen del pedido</h2>
                </div> */}

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
                      <h4 className="text-secondary font-size-1 mb-0 me-3">Cósto del envío</h4>

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
                          $25500
                        </span>
                      </div>
                    )}


                </div>

                {/* TOTAL */}
                <div className="media align-items-center mb-3">
                  <h4 className="h3 font-bold mb-0 me-3">Total</h4>
                  <div className="media-body text-right">
                    <span className="h3 font-bold text-dark">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>


                <div className="summary-coupon">
                  <div className="box-discount-coupon-applied">
                      <div className="col-12 text-center">
                        <div id="" className="btn btn-sm btn-outline-dark rounded-pill w-100" tabindex="0" role="button">
                          <span>
                            <svg className="coupon-icon" width="13px" height="13px" viewBox="0 0 1024 1024"><path d="M992.6,564.8L546.7,41.3C502.1-11,426.5-14,377.9,34.6L34.6,377.9C-14,426.5-11,502.1,41.3,546.6l523.4,445.9 c52.4,44.6,134.2,41.3,182.8-7.3l237.7-237.7C1033.9,699,1037.2,617.1,992.6,564.8z M709.5,802.8c-51.6,0-93.3-41.8-93.3-93.3 c0-51.5,41.8-93.3,93.3-93.3s93.3,41.8,93.3,93.3C802.8,761,761,802.8,709.5,802.8z"></path></svg>
                            <span className="text-pre-line ps-2">Agregar cupón de descuento</span>
                          </span>
                        </div>
                      </div>
                  </div>
                </div>


              </div>
              </div>
            </div>
          </div>


          {/* LEFT COLUMN (checkout actions, forms...) */}
          <div className="col-lg-8 order-lg-1">

            <div className="px-0">
              <OrderSummary />
            </div>
            

          </div>
        </div>
      </div>
    </div>
    </>
  );
}
