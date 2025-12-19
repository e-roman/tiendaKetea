

import { Link } from "react-router-dom";
import { useFavorites } from "../../src/hooks/useFavorites";

export default function AccountWhishlist() {
  const { favorites, toggleFavorite } = useFavorites();
  const itemsCount = favorites.length;


  return (
      <>
      <div className="card shadow-none p-2 p-lg-5 p-2 p-lg-5 h-100">
        <div className="pt-4 pt-md-0 pb-4 mb-3 pb-md-5 mb-md-4  d-sm-flex justify-content-sm-between align-items-sm-center border-bottom">
          <h4 className="card-header-title">Recientemente agregado/s</h4>
          <span className="lh-1">
            {itemsCount} {itemsCount === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Body */}
        <div className="card-body p-1 p-md-0 mt-2 mt-md-3 h-100">
          {/* Form */}
          <form>
            
            {favorites.length === 0 && (
              <>
              <div className="text-center pt-8">
              <div className="mb-4">
                <img className="avatar avatar-xxl avatar-4x2" src="../assets/svg/illustrations/empty-cart.svg" alt="SVG"/>
              </div>
              <div className="mb-5">
                <h1 className="h4">No tenés productos guardados.</h1>
                <p>Agrega todos los productos que quieras a tus favoritos.</p>
              </div>
              </div>
            </>
            )}

            {favorites.map((item) => (
              <div key={item.id} className="border-bottom pb-5 mb-5">
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

                        {/* PRECIOS (oldPrice + price) */}
                        <div className="pricing-meta my-1">
                          <ul className="d-flex align-items-center p-0 m-0 list-unstyled">
                            {item.oldPrice && (
                              <li className="old-price me-2">
                                ${item.oldPrice.toLocaleString()}
                              </li>
                            )}
                            <li className="current-price font-medium">
                              ${item.price.toLocaleString()}
                            </li>
                          </ul>
                        </div>

                        {/* BADGES */}
                        {item.stock ? (
                          <>
                            {item.discount > 0 && (
                              <span className="badge py-1 px-2 badge-yellow me-1">
                                -{item.discount}%
                              </span>
                            )}

                            {item.envioGratis && (
                              <span className="badge py-1 px-2 bg-dark text-white me-1">
                                Envío Gratis
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="badge py-1 px-2 bg-danger text-white">
                            Sin Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* QUANTITY + REMOVE */}
                  <div className="col-5 col-md-3 offset-md-1">
                    <select className="form-select mb-3 w-auto">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(item)}
                        className="d-block text-secondary font-size-1 mb-1 bg-transparent border-0 p-0"
                      >
                        <i className="bi bi-trash me-1"></i>
                        Eliminar
                      </button>
                  </div>

                  {/* PRICE (final individual) */}
                  <div className="col-6 col-md-2 text-md-right">
                    <span className="font-medium">
                      ${item.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}


          </form>
          {/* End Form */}
        </div>
        {/* End Body */}

        <div className="text-center">
          <Link className="btn btn-primary btn-sm rounded-pill px-6 text-center" to="/"><i className="bi bi-arrow-left me-1"></i> Continuar comprando</Link>
        </div>
      </div>

    </>
  );
}