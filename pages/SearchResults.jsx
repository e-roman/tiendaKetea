import { useNavigate, useParams } from "react-router-dom";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();

  const openProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const searchTerm = query.toLowerCase().trim();
  const results = productsData.filter((p) => {
    const title = p.title?.toLowerCase() || "";
    const categories = p.categories?.map(c => c.toLowerCase()) || [];
    return title.includes(searchTerm) || categories.some(c => c.includes(searchTerm));
  });

  return (
    <div>

      {/* BREADCRUMB */}
      <div className="bg-light">
        <div className="container py-4">
          <div className="row">
            <div className="col-sm">
              <h4 className="mb-0">Resultados para: "{query}"</h4>
            </div>

            <div className="col-sm-auto">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">Inicio</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/buscar">Buscar</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Resultados
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container content-space-t-1 content-space-b-2">
        <div className="row">

          {/* LATERAL (filtros estáticos por ahora) */}
          <div className="col-lg-3">
            <div className="navbar-expand-lg mb-5">

              <div className="d-grid">
                <button
                  className="navbar-toggler btn btn-white mb-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarFilters"
                >
                  <span className="d-flex justify-content-between align-items-center">
                    <span className="text-dark">Filtros</span>
                    <i className="bi-list"></i>
                  </span>
                </button>
              </div>

              <div id="navbarFilters" className="collapse navbar-collapse">
                <div className="w-100">

                  <form>
                    {/* Marca */}
                    <div className="border-bottom pb-4 mb-4">
                      <h5 className="pb-2">Marca</h5>
                      <div className="d-grid gap-2">

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label d-flex">
                            Elektrim <span className="ms-auto">(27)</span>
                          </label>
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label d-flex">
                            Cepex <span className="ms-auto">(18)</span>
                          </label>
                        </div>

                      </div>
                    </div>

                  <div className="border-bottom pb-4 mb-4">
                    <h5 className="pb-2">Categoría</h5>

                    <div className="d-grid gap-2">

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="productosQuimicosCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="productosQuimicosCheckbox">
                          Productos Químicos <span className="ms-auto">(73)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="robotsDolphinCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="robotsDolphinCheckbox">
                          Robots Dolphin <span className="ms-auto">(0)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="accesoriosNatacionCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="accesoriosNatacionCheckbox">
                          Accesorios Natación <span className="ms-auto">(51)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="inflablesJuegosCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="inflablesJuegosCheckbox">
                          Inflables y juegos <span className="ms-auto">(5)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="accesoriosLimpiezaCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="accesoriosLimpiezaCheckbox">
                          Accesorios de limpieza <span className="ms-auto">(11)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="accesoriosVasoPiscinaCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="accesoriosVasoPiscinaCheckbox">
                          Accesorios Vaso Piscina <span className="ms-auto">(8)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="accesoriosSpaCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="accesoriosSpaCheckbox">
                          Accesorios de Spa <span className="ms-auto">(4)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="accesoriosExteriorPiscinaCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="accesoriosExteriorPiscinaCheckbox">
                          Accesorios de exterior de piscina <span className="ms-auto">(22)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="bombasCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="bombasCheckbox">
                          Bombas <span className="ms-auto">(9)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="bordersAtermicosCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="bordersAtermicosCheckbox">
                          Borders Atérmicos <span className="ms-auto">(12)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="climatizacionPiscinasCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="climatizacionPiscinasCheckbox">
                          Climatización de Piscinas <span className="ms-auto">(16)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gabinetesCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="gabinetesCheckbox">
                          Gabinetes <span className="ms-auto">(3)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="conduccionFluidosCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="conduccionFluidosCheckbox">
                          Conducción de Fluidos <span className="ms-auto">(27)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="cuidadoAguaCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="cuidadoAguaCheckbox">
                          Cuidado del agua <span className="ms-auto">(19)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="filtrosCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="filtrosCheckbox">
                          Filtros <span className="ms-auto">(33)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="iluminacionCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="iluminacionCheckbox">
                          Iluminación <span className="ms-auto">(14)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="revestimientosCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="revestimientosCheckbox">
                          Revestimientos <span className="ms-auto">(6)</span>
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="riegoCheckbox"/>
                        <label className="form-check-label d-flex" htmlFor="riegoCheckbox">
                          Riego <span className="ms-auto">(10)</span>
                        </label>
                      </div>

                    </div>
                  </div>


                    <div className="d-grid">
                      <button type="button" className="btn btn-sm rounded-pill btn-primary mb-3">
                        Aplicar filtros
                      </button>
                      <button type="button" className="btn btn-sm rounded-pill border-0">
                        Borrar filtros
                      </button>
                    </div>

                  </form>

                </div>
              </div>

            </div>
          </div>

          {/* LISTADO PRINCIPAL */}
          <div className="col-lg-9">

            {/* TOP ROW */}
            <div className="row align-items-center mb-5">
              <div className="col-sm mb-3 mb-sm-0">
                <h6 className="mb-0">{results.length} productos encontrados</h6>
              </div>

              <div className="col-sm-auto">
                <div className="d-sm-flex justify-content-sm-end align-items-center">

                  <div className="d-flex align-items-center gap-2 me-sm-2">
                    <div className="w-100"><span>Ordenar por</span></div>
                    <select className="form-select" style={{ minWidth: "190px" }}>
                          <option value="price_low">Precio más bajo</option>
                          <option value="price_high">Precio más alto</option>
                          <option value="featured">Destacados</option>
                          <option value="popular">Más recientes</option>
                          <option value="new">Con descuento</option>
                          <option value="best-selling">Más vendidos</option>
                          <option value="alpha-ascending">A - Z</option>
                          <option value="alpha-descending">Z - A</option>
                    </select>
                  </div>

                  <ul className="nav nav-segment">
                    <li className="nav-item">
                      <a className="nav-link active">
                        <i className="bi-grid-fill"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link">
                        <i className="bi-list"></i>
                      </a>
                    </li>
                  </ul>

                </div>
              </div>
            </div>

            {/* GRILLA DINÁMICA */}
            <div className="row row-cols-sm-2 row-cols-md-3 mb-10">

              {results.length === 0 && (
                <div className="col-12">
                  <p>No hay productos que coincidan con la búsqueda.</p>
                </div>
              )}

              {results.map((p) => (
                <div className="col mb-4" key={p.id}>
                  <ProductCard product={p} openProduct={openProduct} />
                </div>
              ))}

            </div>

            {/* PAGINACIÓN (estática por ahora) */}
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <span className="page-link">
                    <i className="bi-chevron-double-left small"></i>
                  </span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a className="page-link">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link">5</a>
                </li>
                <li className="page-item">
                  <a className="page-link">
                    <i className="bi-chevron-double-right small"></i>
                  </a>
                </li>
              </ul>
            </nav>

          </div>

        </div>
      </div>

    </div>
  );
}
