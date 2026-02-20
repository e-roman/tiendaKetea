
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

import QuantityControl from "@/components/QuantityControl";

export default function MyCart() {
 const [loadingItemId, setLoadingItemId] = useState(null);
  const {
    cart,
    removeFromCart,
    updateQuantity,
    shipping,
    shippingCost,
    setShipping,
  } = useCart();

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + shippingCost;
  
 
  const increase = (item) => {
    setLoadingItemId(item.id);

    setTimeout(() => {
      updateQuantity(item.id, item.quantity + 1);
      setLoadingItemId(null);
    }, 300);
  };

  const decrease = (item) => {
    if (item.quantity <= 1) return;

    setLoadingItemId(item.id);

    setTimeout(() => {
      updateQuantity(item.id, item.quantity - 1);
      setLoadingItemId(null);
    }, 300);
  };

return (
  <>
    <div className="bg-light-medium">
      <div className="container space-1 space-md-t-1 space-bottom-md-3">
        <div className="row">

          <div className="col-lg-12 pb-4">
            <h1 className="h3 mb-0">Mi Carrito</h1>
          </div>

          {cart.length === 0 ? (

            /* ================= EMPTY STATE ================= */
            <div className="col-12">
              <div id="emptyCart" className="content-space-t-4 content-space-b-4 text-center">
                <div className="w-lg-50 mx-auto px-5">
                  <div className="mb-5">
                    <img
                      className="avatar avatar-xxl avatar-4x2"
                      src="/assets/svg/illustrations/empty-cart.svg"
                      alt="Carrito vacío"
                    />
                  </div>
                  <h1 className="h2 mb-2">Tu carrito está vacío.</h1>
                  <p className="mb-5">
                    Antes de finalizar la compra, debes añadir algunos productos a tu carrito.
                  </p>
                  <Link to="/" className="btn btn-primary btn-sm px-6">
                    Agregar Productos
                  </Link>
                </div>
              </div>
            </div>

          ) : (

            <>
              {/* ================= LEFT COLUMN - PRODUCTS ================= */}
              <div className="col-lg-8">

                <form>
                  {cart.map((item) => (
                    <div key={item.slug} className="card shadow-none border mb-3">
                      <div className="card-body px-4 pt-4 pb-5 pt-md-5 pb-md-3 px-md-4">

                        <div className="border-bottom pb-3 mb-3">
                          <div className="row">

                            {/* IMAGE + INFO */}
                            <div className="col-md-6 mb-3 mb-md-0">
                              <div className="media">
                                <div className="max-width-15 w-100 me-3">
                                  <img
                                    className="img-fluid"
                                    src={item.image}
                                    alt={item.title}
                                  />
                                </div>

                                <div className="media-body">
                                  <Link
                                    to={`/product/${item.slug}`}
                                    className="text-dark text-decoration-none"
                                  >
                                    <h2 className="h5 mb-1">{item.title}</h2>
                                  </Link>

                                  <div className="pricing-meta my-1">
                                    <ul className="d-flex align-items-center p-0 m-0 list-unstyled">
                                      {item.oldPrice && (
                                        <li className="old-price me-2">
                                          ${item.oldPrice.toLocaleString("es-AR")}
                                        </li>
                                      )}
                                      <li className="current-price font-medium">
                                        ${item.price.toLocaleString("es-AR")}
                                      </li>
                                    </ul>
                                  </div>

                                  {item.stock ? (
                                    <>
                                      {item.discount > 0 && (
                                        <span className="badge py-1 px-2 badge-yellow me-1">
                                          -{item.discount}% OFF
                                        </span>
                                      )}
                                      {item.envioGratis && (
                                        <span className="badge py-1 px-2 badge-green text-white me-1">
                                          Envío Gratis
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <span className="badge py-1 px-2 badge-danger text-white">
                                      Sin Stock
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* QUANTITY + REMOVE */}
                            <div className="col-5 col-md-2 offset-md-1">
                              <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                                <QuantityControl
                                  item={item}
                                  onIncrease={increase}
                                  onDecrease={decrease}
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="d-block text-dark font-size-1 mb-1 bg-transparent border-0 p-0"
                              >
                                <i className="bi bi-trash me-1"></i>
                                Eliminar
                              </button>
                            </div>

                            {/* ITEM TOTAL */}
                            <div className="col-6 col-md-3 text-md-right">
                              <span className="font-bold text-dark">
                                ${(item.price * item.quantity).toLocaleString("es-AR")}
                              </span>
                            </div>

                          </div>
                        </div>

                        <p className="font-14 font-medium text-dark m-0">
                          Llega en 1 día hábil seleccionando <b>Envío Express</b> al comprar
                        </p>

                      </div>
                    </div>
                  ))}
                </form>

                <div className="d-flex justify-content-start d-none d-md-block pt-4">
                  <Link to="/">
                    <i className="bi bi-arrow-left me-1"></i>
                    Continuar comprando
                  </Link>
                </div>

              </div>

              {/* ================= RIGHT COLUMN - SUMMARY ================= */}
              <div className="col-lg-4">
                <div className="ps-lg-2">

                  <div className="bg-white shadow-soft rounded border px-4 pt-4 pb-5 mb-4">

                    <div className="border-bottom pb-3 mb-4">
                      <h2 className="h4 font-bold mb-0">Resumen del pedido</h2>
                    </div>

                    <div className="border-bottom mb-4">

                      <div className="d-flex justify-content-between mb-3">
                        <span>Productos ({totalItems})</span>
                        <span className="font-bold">
                          ${subtotal.toLocaleString("es-AR")}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <span>Envío</span>
                        <span className="font-medium">
                          {shippingCost === 0
                            ? "Gratis"
                            : `$${shippingCost.toLocaleString("es-AR")}`}
                        </span>
                      </div>

                    </div>

                    <div className="d-flex justify-content-between mb-4">
                      <span className="h4 font-bold">Total</span>
                      <span className="h3 font-bold">
                        ${total.toLocaleString("es-AR")}
                      </span>
                    </div>

                    <Link
                      className="btn btn-sm font-16 btn-primary w-100"
                      to="/checkout"
                    >
                      Comenzar compra
                    </Link>

                  </div>

                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  </>
);
}
