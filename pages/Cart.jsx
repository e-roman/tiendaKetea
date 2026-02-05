
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




          {/* LEFT COLUMN - PRODUCTS */}
          <div className="col-lg-8">

<form>
  {/* CARD 1 */}
  <div className="card shadow-none border mb-3">
    <div className="card-body px-4 pt-4 pb-5 pt-md-5 pb-md-3 px-md-4">
      <div className="border-bottom pb-3 mb-3">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="media">
              <div className="max-width-15 w-100 me-3">
                <img
                  className="img-fluid"
                  alt="Robot limpia piscina Dolphin Pool Up"
                  src="../assets/img/products/dolphin-Pool-up.png"
                />
              </div>

              <div className="media-body">
                <a
                  className="text-dark text-decoration-none"
                  href="/product/robot-limpia-piscinas-dolphin-pool-up"
                >
                  <h2 className="h5 mb-1">
                    Robot limpia piscina Dolphin Pool Up
                  </h2>
                </a>

                <div className="pricing-meta my-1">
                  <ul className="d-flex align-items-center p-0 m-0 list-unstyled">
                    <li className="old-price me-2">$2.308.950</li>
                    <li className="current-price font-medium">
                      $2.078.055
                    </li>
                  </ul>
                </div>

                <span className="badge py-1 px-2 badge-yellow me-1">
                  -25%
                </span>
                <span className="badge py-1 px-2 bg-send text-white me-1">
                  Envío Gratis
                </span>
              </div>
            </div>
          </div>

          <div className="col-5 col-md-2 offset-md-1">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
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

                <button
                  type="button"
                  className="btn btn-icon btn-xs px-1 rounded-circle"
                >
                  <h4 className="btn-icon__inner font-normal mb-0">+</h4>
                </button>
              </div>
            </div>

            <button
              type="button"
              className="d-block text-dark font-size-1 mb-1 bg-transparent border-0 p-0"
            >
              <i className="bi bi-trash me-1" />
              Eliminar
            </button>
          </div>

          <div className="col-6 col-md-3 text-md-right">
            <span className="font-bold text-dark">$2.078.055</span>
          </div>
        </div>
      </div>

      <div>
        <p className="font-14 font-medium text-dark m-0">
          Llega en 1 día hábil seleccionando <b>Envío Express</b> al comprar
        </p>
      </div>
    </div>
  </div>

  {/* CARD 2 */}
  <div className="card shadow-none border mb-3">
    <div className="card-body px-4 pt-4 pb-5 pt-md-5 pb-md-3 px-md-4">
      <div className="border-bottom pb-3 mb-3">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="media">
              <div className="max-width-15 w-100 me-3">
                <img
                  className="img-fluid"
                  alt="Cloro Granulado Activo Nataclor 20kg"
                  src="../assets/img/products/granulado.png"
                />
              </div>

              <div className="media-body">
                <a
                  className="text-dark text-decoration-none"
                  href="/product/cloro-granulado-nataclor-20kg"
                >
                  <h2 className="h5 mb-1">
                    Cloro Granulado Activo Nataclor 20kg
                  </h2>
                </a>

                <div className="pricing-meta my-1">
                  <ul className="d-flex align-items-center p-0 m-0 list-unstyled">
                    <li className="current-price font-medium">
                      $206.394
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-5 col-md-2 offset-md-1">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
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

                <button
                  type="button"
                  className="btn btn-icon btn-xs px-1 rounded-circle"
                >
                  <h4 className="btn-icon__inner font-normal mb-0">+</h4>
                </button>
              </div>
            </div>

            <button
              type="button"
              className="d-block text-dark font-size-1 mb-1 bg-transparent border-0 p-0"
            >
              <i className="bi bi-trash me-1" />
              Eliminar
            </button>
          </div>

          <div className="col-6 col-md-3 text-md-right">
            <span className="font-bold text-dark">$206.394</span>
          </div>
        </div>
      </div>

      <div>
        <p className="font-14 font-medium text-dark m-0">
          Llega en 1 día hábil seleccionando <b>Envío Express</b> al comprar
        </p>
      </div>
    </div>
  </div>

  {/* CARD 3 */}
  <div className="card shadow-none border mb-3">
    <div className="card-body px-4 pt-4 pb-5 pt-md-5 pb-md-3 px-md-4">
      <div className="border-bottom pb-3 mb-3">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="media">
              <div className="max-width-15 w-100 me-3">
                <img
                  className="img-fluid"
                  alt="Válvula Multipuerto Hayward SP0714T"
                  src="../assets/img/products/valvula-multipuerto-hayward.png"
                />
              </div>

              <div className="media-body">
                <a
                  className="text-dark text-decoration-none"
                  href="/product/valvula-multipuerto-hayward-sp0714t"
                >
                  <h2 className="h5 mb-1">
                    Válvula Multipuerto Hayward SP0714T
                  </h2>
                </a>

                <div className="pricing-meta my-1">
                  <ul className="d-flex align-items-center p-0 m-0 list-unstyled">
                    <li className="old-price me-2">$248.000</li>
                    <li className="current-price font-medium">
                      $221.588
                    </li>
                  </ul>
                </div>

                <span className="badge py-1 px-2 badge-yellow me-1">
                  -11%
                </span>
              </div>
            </div>
          </div>

          <div className="col-5 col-md-2 offset-md-1">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
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

                <button
                  type="button"
                  className="btn btn-icon btn-xs px-1 rounded-circle"
                >
                  <h4 className="btn-icon__inner font-normal mb-0">+</h4>
                </button>
              </div>
            </div>

            <button
              type="button"
              className="d-block text-dark font-size-1 mb-1 bg-transparent border-0 p-0"
            >
              <i className="bi bi-trash me-1" />
              Eliminar
            </button>
          </div>

          <div className="col-6 col-md-3 text-md-right">
            <span className="font-bold text-dark">$221.588</span>
          </div>
        </div>
      </div>

      <div>
        <p className="font-14 font-medium text-dark m-0">
          Llega en 1 día hábil seleccionando <b>Envío Express</b> al comprar
        </p>
      </div>
    </div>
  </div>
</form>




            {/* BACK TO HOME */}
            <div className="d-flex justify-content-start d-none d-md-block pt-4">
              <Link to="/">
                <i className="bi bi-arrow-left me-1"></i>
                Continuar comprando
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN - ORDER SUMMARY */}
          <div className="col-lg-4">
            <div className="ps-lg-2">

              <div className="bg-white shadow-soft rounded border px-4 pt-4 pb-5 pt-md-4 pb-md-4 px-md-4 mb-4">
                <div className="border-bottom pb-3 mb-4">
                  <h2 className="h4 font-bold mb-0">Resumen del pedido</h2>
                </div>

                <div className="border-bottom mb-4">
                  <div className="media align-items-center mb-3">
                    <h3 className="font-14 mb-1 me-3">
                      Productos  ({totalItems})
                    </h3>
                    <div className="media-body text-right">
                      <span className="font-bold text-dark">
                        ${subtotal.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>

                  <div className="media align-items-center mb-3">
                    <h4 className="font-14 mb-0 me-3">
                      Envío
                    </h4>
                    <div className="media-body text-right">
                      <span className="font-medium text-dark">
                        {shippingCost === 0
                          ? "Gratis"
                          : `$${shippingCost.toLocaleString("es-AR")}`}
                      </span>
                    </div>
                  </div>

                  {/* SHIPPING OPTIONS */}
                  <div className="card border-0 shadow-none mb-2">
                    <div className="mt-2 pt-4 mb-3 border-top">
                      <div className="form-check w-100">
                       <input
                            type="radio"
                            id="shipping-standard"
                            name="shipping"
                            className="form-check-input"
                            checked={shipping === "standard"}
                            onChange={() => setShipping("standard")}
                          />

                          <label
                            className="form-check-label w-100 ps-2"
                            htmlFor="shipping-standard"
                          >
                          <span className="d-block text-dark font-size-1 font-bold mb-1">
                            Envío Gratis
                          </span>
                          <span className="d-block text-muted">
                            Puede demorar entre 5 y 6 días hábiles.
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="my-2">
                      <div className="form-check w-100">
                        <input
                            type="radio"
                            id="shipping-express"
                            name="shipping"
                            className="form-check-input"
                            checked={shipping === "express"}
                            onChange={() => setShipping("express")}
                          />

                          <label
                            className="form-check-label w-100 ps-2"
                            htmlFor="shipping-express">
                          <span className="d-block text-dark font-size-1 font-bold mb-1">
                            <div className="d-flex justify-content-between">
                              <div>Envío Express</div> <div><span className="font-bold">$25500</span> </div>
                            </div>
                          </span>
                          <span className="d-block text-muted">
                            El envío puede tardar entre 1 día hábil.
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    {/* <div className="my-2">
                      <div className="form-check w-100">
                        <input
                            type="radio"
                            id="shipping-express"
                            name="shipping"
                            className="form-check-input"
                            checked={shipping === "express"}
                            onChange={() => setShipping("express")}
                          />

                          <label
                            className="form-check-label w-100 ps-2"
                            htmlFor="shipping-express">
                          <span className="d-block text-dark font-size-1 font-bold mb-1">
                            <div className="d-flex justify-content-between">
                              <div>Retirar en local</div> 
                            </div>
                          </span>
                          <span className="d-block text-muted">
                            De lunes a viernes de 10 a 18 hs.
                          </span>
                        </label>
                      </div>
                    </div> */}


                  </div>
                </div>

                <div className="media align-items-center mb-4">
                  <h4 className="h4 font-bold mb-0 me-3">Total</h4>
                  <div className="media-body text-right">
                    <span className="h3 font-bold text-dark">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              
                <Link className="btn btn-sm font-16 btn-primary font-medium w-100" to="/checkout">
                  Comenzar compra
                </Link>

              </div>

              <div className="summary-coupon mt-2 px-md-2">
                <form>
                  <label className="font-medium font-15 text-dark pb-2" htmlFor="cuponDescuento">¿Tenés un cupón de descuento?</label>
                  <div className="d-flex gap-1">
                    <input type="email" className="form-control rounded-1" name="email" id="cuponDescuento" placeholder="Ingresa código del cupón"/>
                    <button className="btn btn-primary rounded-1 py-2 font-15" type="submit" id="subscribeButtonExample3">Aplicar</button>
                  </div>
                </form>
              </div>



              {/* HELP */}
              <div className="pt-5">
                <div className="media-body text-secondary small text-center">
                  <span className="text-dark me-1"><i className="bi bi-chat-square"></i> ¿Necesitás ayuda?</span>
                  <a className="link-muted font-medium" href="#">Escribinos</a>
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
