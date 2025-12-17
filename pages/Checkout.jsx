import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../src/hooks/useCart";
import { useRef, useState } from "react";

export default function Checkout() {
  const { cart } = useCart();
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

    navigate("/Compra"); // si todo está OK → avanza
  };

  return (
    <div className="bg-light">
      <div className="container space-1 space-md-2">
        <div className="row">

          {/* ORDER SUMMARY – RIGHT COLUMN */}
          <div className="col-lg-4 order-lg-2 mb-4 mb-lg-0">
            <div className="ps-xl-4">
              <div className="bg-white shadow-soft rounded px-4 pt-4 pb-5 py-md-5 px-md-5 mb-4">

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
                      <span className="font-medium text-dark">
                        $
                        {cart
                          .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0)
                          .toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>

                  <div className="media align-items-center mb-3">
                    <h4 className="text-secondary font-size-1 mb-0 me-3">Envío</h4>
                    <div className="media-body text-right">
                      <span className="font-medium text-dark">Gratis</span>
                    </div>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="media align-items-center mb-0 mb-md-4">
                  <h4 className="text-secondary font-size-1 mb-0 me-3">Total</h4>
                  <div className="media-body text-right">
                    <span className="font-medium text-dark">
                      $
                      {cart
                        .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0)
                        .toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN (checkout actions, forms...) */}
          <div className="col-lg-8 order-lg-1">

            <div className="card shadow-none mb-5">
              <div className="card-body px-4 pt-5 pb-5 py-md-5 px-md-5">
                <form
                  ref={formRef}
                  className={`needs-validation ${validated ? "was-validated" : ""}`}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="border-bottom pb-5 mb-7">

                    <div className="mb-4">
                      <h2 className="h3">Dirección de Envío</h2>
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

                      <div className="col-md-12 mb-3 mb-md-4">
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

                      <div className="col-md-6 mb-3 mb-md-4">
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

                      <div className="col-md-6 mb-3 mb-md-4">
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

                            <label className="d-flex align-items-center gap-2 mb-3"> 
                              <input className="form-check-input flex-shrink-0 mt-0" type="checkbox" value="" /> 
                              <small className="d-block text-body-secondary"> Mi información de facturación y envío es la misma.</small>
                            </label>

                            <label className="d-flex align-items-center gap-2"> 
                              <input className="form-check-input flex-shrink-0 mt-0" type="checkbox" value="" /> 
                              <small className="d-block text-body-secondary">Por favor, envíenme correos electrónicos con ofertas exclusivas, información y novedades de nuevos productos </small>
                            </label>
                        </div>
                      </div>


                  </div>

                  {/* MÉTODO DE PAGO */}
                  <div className="mb-5">
                    <h2 className="h4">Método de Pago</h2>
                  </div>

                  <div className="mb-md-4">
                    <label className="form-label">Número de tarjeta *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardNumber"
                      required
                    />
                    <div className="invalid-feedback">
                      Número de tarjeta inválido.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Titular *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cardHolder"
                        required
                      />
                      <div className="invalid-feedback">
                        Ingresá el nombre del titular.
                      </div>
                    </div>

                    <div className="col-md-2 mb-3">
                      <label className="form-label">Venc.</label>
                      <input
                        type="text"
                        className="form-control"
                        name="expiration"
                        required
                      />
                      <div className="invalid-feedback">
                        Formato inválido.
                      </div>
                    </div>

                    <div className="col-md-2 mb-3">
                      <label className="form-label">CVC *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cvc"
                        required
                      />
                      <div className="invalid-feedback">
                        CVC inválido.
                      </div>
                    </div>
                  </div>

                  {/* BOTÓN FINAL */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mt-md-8">
                    <Link to="/cart" className="order-2 order-md-1">
                      <small className="bi bi-arrow-left me-1 d-md-none"></small> Regresar a mi Carrito
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-primary btn-sm rounded-pill px-6 order-1 order-md-2 mb-5 mb-md-0 mt-5 mt-md-0 btn-checkout"
                    >
                      Realizar pedido
                    </button>
                  </div>


                </form>
              </div>
            </div>

{/* 
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Link to="/cart">
                <small className="fas fa-arrow-left me-2"></small> Regresar a mi carrito
              </Link>

              <button type="submit" className="btn btn-primary btn-sm rounded-pill px-5">
                Realizar pedido
              </button>
            </div> */}

            

          </div>
        </div>
      </div>
    </div>
  );
}
