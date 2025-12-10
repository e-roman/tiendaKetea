import { Link } from "react-router-dom";
import { useCart } from "../src/hooks/useCart";

export default function Checkout() {
  const { cart } = useCart();

  return (
    <div className="bg-light">
      <div className="container space-1 space-md-2">
        <div className="row">

{/* ORDER SUMMARY – RIGHT COLUMN */}
<div className="col-lg-4 order-lg-2 mb-7 mb-lg-0">
  <div className="bg-white shadow-soft rounded p-5 mb-4">

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
    <div className="media align-items-center mb-4">
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

          {/* LEFT COLUMN (checkout actions, forms...) */}
          <div className="col-lg-8 order-lg-1">

            <div className="card shadow-none mb-5">
              <div className="card-body">
                <form className="js-validate" noValidate="novalidate">
                  <div className="border-bottom pb-7 mb-7">
                    {/*!-- Title */}
                    <div className="mb-4">
                      <h2 className="h3">Dirección de Envío</h2>
                    </div>
                    {/*!-- End Title */}

                    {/*!-- Billing Form */}
                    <div className="row">
                      <div className="col-md-6">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Nombre 
                            <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" name="firstName" placeholder="Escribe aquí tu nombre" aria-label="Escribe aquí tu nombre" required="" data-msg="Please enter your frist name." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="col-md-6">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Apellidos 
                            <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" name="lastName" placeholder="Escribe aquí tu apellido" aria-label="Escribe aquí tu apellido" required="" data-msg="Please enter your last name." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="w-100"></div>

                      <div className="col-md-6">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Email
                            <span className="text-danger">*</span>
                          </label>
                          <input type="email" className="form-control" name="emailAddress" placeholder="tuemail@gmail.com" aria-label="tuemail@gmail.com" required="" data-msg="Please enter a valid email address." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="col-md-6">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Teléfono
                          </label>
                          <input type="text" className="form-control" placeholder="+1 (062) 109-9222" aria-label="+1 (062) 109-9222" data-msg="Please enter your last name." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="w-100"></div>

                      <div className="col-md-8">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Dirección
                            <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" name="streetAddress" placeholder="Escribe aquí tu dirección" aria-label="Escribe aquí tu dirección" required="" data-msg="Please enter a valid address." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="col-md-4">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Depto.
                          </label>
                          <input type="text" className="form-control" placeholder="Núemero" aria-label="Núemero" data-msg="Please enter a valid address." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="col-md-12">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Ciudad
                            <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" name="cityAddress" placeholder="Escribe aquí tu ciudad" aria-label="Escribe aquí tu ciudad" required="" data-msg="Please enter a valid address." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="w-100"></div>

                      <div className="col-md-6">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Provincia
                            <span className="text-danger">*</span>
                          </label>
                          <select className="form-select" id="country" required=""> 
                            <option value="">Seleccionar</option> 
                              <option value="AR-B" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Buenos Aires</span></span>'>Buenos Aires</option>
                              <option value="AR-K" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Catamarca</span></span>'>Catamarca</option>
                              <option value="AR-H" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Chaco</span></span>'>Chaco</option>
                              <option value="AR-U" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Chubut</span></span>'>Chubut</option>
                              <option value="AR-C" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Ciudad Autónoma de Buenos Aires</span></span>'>Ciudad Autónoma de Buenos Aires</option>
                              <option value="AR-X" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Córdoba</span></span>'>Córdoba</option>
                              <option value="AR-W" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Corrientes</span></span>'>Corrientes</option>
                              <option value="AR-E" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Entre Ríos</span></span>'>Entre Ríos</option>
                              <option value="AR-P" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Formosa</span></span>'>Formosa</option>
                              <option value="AR-Y" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Jujuy</span></span>'>Jujuy</option>
                              <option value="AR-L" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">La Pampa</span></span>'>La Pampa</option>
                              <option value="AR-F" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">La Rioja</span></span>'>La Rioja</option>
                              <option value="AR-M" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Mendoza</span></span>'>Mendoza</option>
                              <option value="AR-N" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Misiones</span></span>'>Misiones</option>
                              <option value="AR-Q" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Neuquén</span></span>'>Neuquén</option>
                              <option value="AR-R" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Río Negro</span></span>'>Río Negro</option>
                              <option value="AR-A" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Salta</span></span>'>Salta</option>
                              <option value="AR-J" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">San Juan</span></span>'>San Juan</option>
                              <option value="AR-D" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">San Luis</span></span>'>San Luis</option>
                              <option value="AR-Z" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Santa Cruz</span></span>'>Santa Cruz</option>
                              <option value="AR-S" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Santa Fe</span></span>'>Santa Fe</option>
                              <option value="AR-G" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Santiago del Estero</span></span>'>Santiago del Estero</option>
                              <option value="AR-V" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Tierra del Fuego</span></span>'>Tierra del Fuego</option>
                              <option value="AR-T" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Tucumán</span></span>'>Tucumán</option>

                          </select>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="col-md-6">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Código Postal
                            <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" name="postcode" placeholder="99999" aria-label="99999" required="" data-msg="Please enter a postcode or zip code." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="w-100"></div>

                      <div className="col-12">
                        {/*!-- Checkbox */}
                        <div className="js-form-message">

                            <label className="d-flex align-items-center gap-2 mb-3"> 
                              <input className="form-check-input flex-shrink-0 mt-0" type="checkbox" value="" defaultChecked=""/> 
                              <small className="d-block text-body-secondary"> Mi información de facturación y envío es la misma.</small>
                            </label>

                            <label className="d-flex align-items-center gap-2"> 
                              <input className="form-check-input flex-shrink-0 mt-0" type="checkbox" value="" defaultChecked=""/> 
                              <small className="d-block text-body-secondary">Por favor, envíenme correos electrónicos con ofertas exclusivas, información y novedades de nuevos productos </small>
                            </label>

                        </div>
                        {/*!-- End Checkbox */}
                      </div>
                    </div>
                    {/*!-- End Billing Form */}
                  </div>

                  {/*!-- Payment */}
                  <div>
                    {/*!-- Title */}
                    <div className="mb-4">
                      <h2 className="h4">Método de Pago</h2>
                    </div>
                    {/*!-- End Title */}

                    {/*!-- Input */}
                    <div className="js-form-message mb-6">
                      <label className="form-label">
                        Número de tarjeta
                      </label>
                      <input type="text" className="form-control" name="cardNumber" placeholder="**** **** **** ***" aria-label="**** **** **** ***" required="" data-msg="Please enter a valid card number." data-error-class="u-has-error" data-success-class="u-has-success"/>
                    </div>
                    {/*!-- End Input */}

                    <div className="row">
                      <div className="col-md-8">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Titular de la tarjeta
                          </label>
                          <input type="text" className="form-control" name="cardHolder" placeholder="Como figura en la tarjeta" aria-label="Como figura en la tarjeta" required="" data-msg="Please enter a valid card holder." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="col-md-2">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            Vencimiento
                          </label>
                          <input type="text" className="form-control" name="cardExpirationDate" placeholder="MM/YY" aria-label="MM/YY" required="" data-msg="Please enter a valid date." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>

                      <div className="col-md-2">
                        {/*!-- Input */}
                        <div className="js-form-message mb-6">
                          <label className="form-label">
                            CVC
                          </label>
                          <input type="text" className="form-control" name="cardCVC" placeholder="***" aria-label="***" required="" data-msg="Please enter a valid CVC number." data-error-class="u-has-error" data-success-class="u-has-success"/>
                        </div>
                        {/*!-- End Input */}
                      </div>
                    </div>
                  </div>
                  {/*!-- End Payment */}
                </form>
              </div>
            </div>


            <div className="d-flex justify-content-between align-items-center mb-4">
              <Link to="/cart">
                <small className="fas fa-arrow-left me-2"></small> Regresar a mi carrito
              </Link>

              <button className="btn btn-primary btn-sm rounded-pill px-5">
                Realizar pedido
              </button>
            </div>

            {/* Aquí podrías poner formulario de envío, pago, datos del usuario, etc. */}

          </div>
        </div>
      </div>
    </div>
  );
}
