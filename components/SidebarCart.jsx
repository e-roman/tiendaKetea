import { Offcanvas } from "bootstrap";
import { useCart } from "../src/hooks/useCart";
import { useNavigate, Link } from "react-router-dom";

export default function SidebarCart() {
  const { cart, removeFromCart, updateQuantity } = useCart(); // agregar updateQuantity
  const navigate = useNavigate();

  const closeCart = () => {
    const el = document.getElementById("cartOffcanvas");
    if (!el) return;
    const bs = Offcanvas.getInstance(el);
    if (bs) bs.hide();
  };

  const handleStartCheckout = () => {
    closeCart();
    navigate("/cart");
  };

  // Funciones para manejar cantidad en el sidebar
  const decrease = (product) => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  const increase = (product) => {
    updateQuantity(product.id, product.quantity + 1);
  };

  return (
    <div className="offcanvas offcanvas-end" id="cartOffcanvas" tabIndex="-1">
      {/* HEADER */}
      <div className="offcanvas-header justify-content-between align-items-center border-bottom py-3 px-3">
        <h4 className="mb-0">Carrito de Compras</h4>
        <button className="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>

      {/* BODY */}
      <div className="offcanvas-body py-3 px-3">
        {cart.length === 0 ? (
          <div id="emptyCart" className="content-space-t-5 text-center">
            <div className="w-lg-100 mx-md-auto px-5">
              <div className="mb-5">
                <img className="avatar avatar-xxl avatar-4x2" src="../assets/svg/illustrations/empty-cart.svg" alt="SVG"/>
              </div>
              <h1 className="h2 mb-2">Tu carrito está vacío.</h1>
              <p>Antes de finalizar la compra, debes añadir algunos productos a tu carrito.</p>
              <button className="btn btn-primary btn-sm rounded-pill px-6" data-bs-dismiss="offcanvas">Agregar Productos</button>
            </div>
          </div>
        ) : (
          <div id="listCart" className="list-group">
            <ul className="items-SideCart">
              {cart.map((product) => (
                <li key={product.slug} className="itemAdded gap-3 d-flex mb-3">
                  <div className="flex-shrink-0 d-flex align-items-start justify-content-center position-relative">
                    {product.quantity > 1 && (
                      <span className="badge badge-sm badge-primary badge-pos rounded-circle">
                        {product.quantity}
                      </span>
                    )}
                    <img src={product.image} className="avatar avatar-xl" alt={product.title} />
                  </div>

                  <div className="d-flex flex-column ms-3 w-100">
                    <div className="d-flex justify-content-between align-items-start">

                      <div>
                        <Link
                          to={`/product/${product.slug}`}
                          className="text-dark text-decoration-none"
                          onClick={closeCart}
                        >
                          <h5 className="mb-0 pe-4">{product.title}</h5>
                        </Link>

                        <div className="mb-3 w-100">
                        {/* Badges */}
                        {product.stock ? (
                          <>
                            {product.discount > 0 && (
                              <span className="badge py-1 px-2 badge-yellow me-1">-{product.discount}%</span>
                            )}
                            {product.envioGratis && (
                              <span className="badge py-1 px-2 bg-dark text-white me-1">Envío Gratis</span>
                            )}
                          </>
                        ) : (
                          <span className="badge py-1 px-2 bg-danger text-white">Sin Stock</span>
                        )}
                        </div>
                      </div>

                      <button
                        className="text-secondary font-18 btn border-0 pt-0 bg-transparent"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>

                    {/* Quantity + Precios */}
                    <div className="d-flex align-items-center justify-content-between gap-3 mt-2">
                      {/* Quantity */}
                      <div className="border rounded btn-i-d d-flex align-items-center justify-content-between w-30">
                        <button
                          type="button"
                          className="btn btn-icon btn-xs px-1 rounded-circle"
                          onClick={() => decrease(product)}
                        >
                          <h4 className="btn-icon__inner font-normal mb-0">-</h4>
                        </button>

                        <input
                          className="form-control lh-1 border-0 rounded p-0 text-center w-25"
                          type="text"
                          value={product.quantity}
                          readOnly
                        />

                        <button
                          type="button"
                          className="btn btn-icon btn-xs px-1 rounded-circle"
                          onClick={() => increase(product)}
                        >
                          <h4 className="btn-icon__inner font-normal mb-0">+</h4>
                        </button>
                      </div>

                      {/* Precios */}
                      <div className="pricing-meta my-1">
                        <ul>
                          {product.oldPrice && (
                            <li className="old-price me-2">
                              ${(product.oldPrice * product.quantity).toLocaleString()}
                            </li>
                          )}
                          <li className="current-price font-medium">
                            ${(product.price * product.quantity).toLocaleString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* SUBTOTAL */}
            <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
              <h4 className="mb-0 font-bold">Subtotal <span className="h6">(Sin envío)</span>:</h4>
              <h4 className="mb-0 font-bold">
                ${cart.reduce((acc, p) => acc + p.price * p.quantity, 0).toLocaleString()}
              </h4>
            </div>


              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="small text-black mb-0">Entregas para el CP: 1706</p>
                <a href="#" className="btn btn-sm btn-outline-secondary py-1 rounded-pill text-black font-12">CAMBIAR CP</a>
              </div>

              <div className="alert alert-warning small py-2 text-center rounded-3">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Los productos Stihl se retiran unicamente por el local.
              </div>

              <div className="pb-2">
                <p className="small text-black mb-2">
                  <i className="bi bi-truck f-icons-18"></i> Envío a Domicilio
                </p>

                <div className="card border shadow-none mb-3">
                  <div className="card-body p-3">
                    <div className="form-check">
                      <input id="inputSidebar1" name="paymentMethod" type="radio" className="form-check-input" required />
                      <label className="form-check-label" htmlFor="inputSidebar1">
                        <span className="d-block text-dark font-size-1 font-medium mb-0">Envío personalizado</span>
                        <span className="d-block text-muted">Llega entre el miércoles 03/12 y el lunes 08/12</span>
                      </label>
                    </div>
                  </div>
                </div>

                <p className="small text-black mb-2">
                  <i className="bi bi-geo-alt"></i> Retirar por:
                </p>

                <div className="card border shadow-none mb-3">
                  <div className="card-body p-3">
                    <div className="form-check">
                      <input id="inputSidebar2" name="paymentMethod" type="radio" className="form-check-input" required />
                      <label className="form-check-label" htmlFor="inputSidebar2">
                        <span className="d-block text-dark font-size-1 font-medium mb-0">Ketea Ramos Mejía</span>
                        <span className="d-block text-muted">
                          Cnel. Brandsen 2230, Ramos Mejía, Buenos Aires.<br />
                          Lun a Vie. de 9 a 18 hrs.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>









            {/* TOTAL */}
            <div className="py-4 d-flex align-items-center justify-content-between">
              <h3 className="mb-0">Total:</h3>
              <h2 className="mb-0 font-bold">
                ${cart.reduce((acc, p) => acc + p.price * p.quantity, 0).toLocaleString()}
              </h2>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="footer-sidebar">
          <div className="mb-md-3 w-100">
            <button className="btn btn-primary rounded-pill px-6 w-100" onClick={handleStartCheckout}>
              Iniciar compra
            </button>
          </div>

          <div className="d-none d-md-block">
            <Link className="btn bg-white btn-sm px-6 w-100" to="/">
              Ver más Productos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
