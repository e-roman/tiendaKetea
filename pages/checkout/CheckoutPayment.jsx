import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../src/hooks/useCart";
import { useRef, useState, useEffect } from "react";

import HeaderCheckOut from "../checkout/HeaderCheckOut";
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


      <div className="summary-details">
          <div>
            <div  className="bg-white rounded border px-3 pt-4 pb-5 py-md-5 px-md-5 mb-4 summary-js-sticky">

              {/* Lista dinámica del carrito */}
              {cart.length === 0 && (
                <p className="text-muted">No hay productos en el carrito.</p>
              )}

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
              <div className="media align-items-center mb-3">
                <h4 className="h3 font-bold mb-0 me-3">Total</h4>
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


   <div className="bg-light-medium bg-white-xs space-bottom-md-4">
      <div className="container px-xs-0">
        <div className="row">

          {/* ORDER SUMMARY – RIGHT COLUMN */}
          <div className="col-lg-4 order-lg-2 mb-4 mb-lg-0 d-none d-md-block ">
            <div className="w-100">
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
                <div className="border-bottom pb-0 mb-4">
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
                <div className="media align-items-center mb-2">
                  <h4 className="h3 font-bold mb-0 me-3">Total</h4>
                  <div className="media-body text-right">
                    <span className="h3 font-bold text-dark">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>


                <div className="summary-coupon mt-4 pt-3 border-top">
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
