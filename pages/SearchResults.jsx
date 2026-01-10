import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import ProductCardHorizontalMobile from "../components/ProductCardHorizontalMobile";
import SearchFilters from "../components/search/SearchFilters";

import SearchSort from "../components/search/SearchSort";

export default function SearchResults() {
  const [view, setView] = useState("grid"); // "grid" | "list"

  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);


  const { query } = useParams();
  const navigate = useNavigate();

  const openProduct = (slug) => navigate(`/product/${slug}`);

  const searchTerm = query.toLowerCase().trim();

  // ----------------------------
  // FILTROS (STATE)
  // ----------------------------
  const [filters, setFilters] = useState({
    marcas: [],
    categorias: [],
    accionamiento: [],
    descuentos: [],
    precioMin: "",
    precioMax: ""
  });

  // Ordenamiento
  const [sort, setSort] = useState("featured");

  // ----------------------------
  // OPCIONES DINÁMICAS
  // ----------------------------
  const marcas = [...new Set(productsData.map(p => p.Marca).filter(Boolean))];
  const categorias = [...new Set(productsData.flatMap(p => p.categories || []))];
  const accionamientos = [...new Set(productsData.map(p => p.accionamiento).filter(Boolean))];
  const descuentos = [...new Set(productsData.map(p => p.discount).filter(d => d > 0))].sort((a, b) => a - b);

  // ----------------------------
  // APLICAR FILTROS
  // ----------------------------
  const filteredResults = useMemo(() => {
    return productsData.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const catLower = (p.categories || []).map(c => c.toLowerCase());

      if (!title.includes(searchTerm) && !catLower.some(c => c.includes(searchTerm))) {
        return false;
      }

      if (filters.precioMin && p.price < Number(filters.precioMin)) {
        return false;
      }

      if (filters.precioMax && p.price > Number(filters.precioMax)) {
        return false;
      }

      if (filters.marcas.length > 0 && !filters.marcas.includes(p.Marca)) {
        return false;
      }

      if (filters.categorias.length > 0 && !p.categories?.some(cat => filters.categorias.includes(cat))) {
        return false;
      }

      if (filters.accionamiento.length > 0 && !filters.accionamiento.includes(p.accionamiento)) {
        return false;
      }

      if (filters.descuentos.length > 0 && !filters.descuentos.includes(p.discount)) {
        return false;
      }

      return true;
    });
  }, [searchTerm, filters]);

  // ----------------------------
  // ORDENAMIENTO
  // ----------------------------
const results = useMemo(() => {
  const ordered = [...filteredResults];

  switch (sort) {
    case "price_low":
      ordered.sort((a, b) => a.price - b.price);
      break;

    case "price_high":
      ordered.sort((a, b) => b.price - a.price);
      break;

    case "az":
      ordered.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "za":
      ordered.sort((a, b) => b.title.localeCompare(a.title));
      break;

    // Más populares (NO tienes views en tu JSON)
    case "popular":
      ordered.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;

    // Más recientes → usa DATE real del JSON
    case "new":
      ordered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;

    // Mayor descuento
    case "discount":
      ordered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      break;

    // Destacados → usa isFeatured del JSON
    case "featured":
      ordered.sort((a, b) => (b.isFeatured === true) - (a.isFeatured === true));
      break;

    default:
      break;
  }

  return ordered;
}, [filteredResults, sort]);



  // ----------------------------
  // HANDLERS
  // ----------------------------
  const toggleFilter = (group, value) => {
    setFilters(prev => {
      const activeValues = prev[group];
      const exists = activeValues.includes(value);
      return {
        ...prev,
        [group]: exists
          ? activeValues.filter(v => v !== value)
          : [...activeValues, value]
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      marcas: [],
      categorias: [],
      accionamiento: [],
      descuentos: [],
      precioMin: "",
      precioMax: ""
    });
  };

  return (
    <>
      <div>

        {/* BREADCRUMB */}
        {/* <div className="bg-light">
          <div className="container py-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><span>Home</span></li>
                    <li className="breadcrumb-item"><span>Buscar</span></li>
                    <li className="breadcrumb-item active" aria-current="page">Resultados de la búsqueda: <b>"{query}"</b></li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div> */}

        <div className="container content-space-t-md-1 content-space-b-2 px-mobile">
          <div className="row">

            {/* LATERAL FILTROS */}
            <div className="col-lg-3 pt-md-3 pe-md-5 d-none d-lg-block">
              <SearchFilters
                filters={filters}
                setFilters={setFilters}
                toggleFilter={toggleFilter}
                resetFilters={resetFilters}
                marcas={marcas}
                categorias={categorias}
                accionamientos={accionamientos}
                descuentos={descuentos}
              />
            </div>

            {/* MOBILE ACTIONS */}
            <div className="d-lg-none mb-3">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary w-50"
                  onClick={() => setShowSort(true)}
                >
                  Ordenar
                </button>

                <button
                  className="btn btn-outline-secondary w-50"
                  onClick={() => setShowFilters(true)}
                >
                  Filtrar
                </button>
              </div>
            </div>


            {/* RESULTADOS */}
            <div className="col-lg-9">
            <div className="row align-items-center mb-1">
              
              <div className="col-sm mb-3 mb-sm-0">
                <h5 className="mb-0" aria-current="page">{results.length} productos: <b>"{query}"</b></h5>
              </div>

              <div className="col-sm-auto d-none d-lg-flex">
                <div className="d-sm-flex justify-content-sm-end align-items-center">
                  {/*!-- Select --*/}
                  <div className="d-flex align-items-center gap-2 mb-2 mb-sm-0 me-sm-2">
                    {/*!-- Select Wrapper --*/}
                    <div className="small">Ordenar por:</div>
                    <div className="filters-seleet" style={{minWidth: "190px"}}>
                      <select
                        className="form-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <option value="featured">Destacados</option>
                        <option value="new">Más recientes</option>
                        <option value="price_low">Precio más bajo</option>
                        <option value="price_high">Precio más alto</option>
                        <option value="discount">Con descuento</option>
                        <option value="az">A - Z</option>
                        <option value="za">Z - A</option>

                      </select>
                    </div>

                      {/*!-- End Select --*/}
                  </div>
                  {/*!-- End Select --*/}


                  {/*!-- Nav --*/}
                  <ul className="nav nav-segment">
                    <ul className="nav nav-segment">
                      <li className="nav-item">
                        <button
                          type="button"
                          className={`nav-link ${view === "grid" ? "active" : ""}`}
                          onClick={() => setView("grid")}
                        >
                          <i className="bi-grid-fill"></i>
                        </button>
                      </li>

                      <li className="nav-item">
                        <button
                          type="button"
                          className={`nav-link ${view === "list" ? "active" : ""}`}
                          onClick={() => setView("list")}
                        >
                          <i className="bi-list"></i>
                        </button>
                      </li>
                    </ul>
                  </ul>
                  {/*!-- End Nav --*/}
                </div>
              </div>

             
            </div>


              {/* CHIPS DE FILTROS ACTIVOS */}
              {(
                filters.marcas.length ||
                filters.categorias.length ||
                filters.accionamiento.length ||
                filters.descuentos.length ||
                filters.precioMin ||
                filters.precioMax
              ) && (
                <div className="row align-items-center mb-3">
                  <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                    
                    {/* LISTA DE CHIPS */}
                    <div className="d-flex gap-2 flex-wrap">
                      
                      {filters.marcas.map(m => (
                        <button key={`marca-${m}`} type="button" className="chip">
                          {m}
                          <span
                            className="icon-inline chip-remove-icon chip-close"
                            onClick={() => toggleFilter("marcas", m)}
                          />
                        </button>
                      ))}

                      {filters.categorias.map(c => (
                        <button key={`cat-${c}`} type="button" className="chip">
                          {c}
                          <span
                            className="icon-inline chip-remove-icon chip-close"
                            onClick={() => toggleFilter("categorias", c)}
                          />
                        </button>
                      ))}

                      {filters.accionamiento.map(a => (
                        <button key={`acc-${a}`} type="button" className="chip">
                          {a}
                          <span
                            className="icon-inline chip-remove-icon chip-close"
                            onClick={() => toggleFilter("accionamiento", a)}
                          />
                        </button>
                      ))}

                      {filters.descuentos.map(d => (
                        <button key={`desc-${d}`} type="button" className="chip">
                          {d}% OFF
                          <span
                            className="icon-inline chip-remove-icon chip-close"
                            onClick={() => toggleFilter("descuentos", d)}
                          />
                        </button>
                      ))}

                      {filters.precioMin && (
                        <button type="button" className="chip">
                          Desde ${filters.precioMin}
                          <span
                            className="icon-inline chip-remove-icon chip-close"
                            onClick={() =>
                              setFilters(prev => ({ ...prev, precioMin: "" }))
                            }
                          />
                        </button>
                      )}

                      {filters.precioMax && (
                        <button type="button" className="chip">
                          Hasta ${filters.precioMax}
                          <span
                            className="icon-inline chip-remove-icon chip-close"
                            onClick={() =>
                              setFilters(prev => ({ ...prev, precioMax: "" }))
                            }
                          />
                        </button>
                      )}

                    </div>

                    {/* BORRAR TODO */}
                    <div>
                      <button
                        type="button"
                        className="btn btn-sm p-0 btn-link btn-link-primary font-14 font-medium"
                        onClick={resetFilters}
                      >
                        Borrar filtros
                      </button>
                    </div>

                  </div>
                </div>
              )}



            {/* RESULTS – DESKTOP */}
            <div className="d-none d-lg-block mt-4">
              {view === "grid" ? (
                <div className="row gx-3">
                  {results.map(p => (
                    <div className="col-xl-4 col-lg-6 mb-4" key={p.id}>
                      <ProductCard product={p} openProduct={openProduct} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row gx-3">
                  {results.map(p => (
                    <div className="mb-4" key={p.id}>
                      <ProductCardHorizontal product={p} openProduct={openProduct} />
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/* RESULTS – MOBILE */}
            <div className="d-lg-none">
              <div className="row gx-2">
                {results.length === 0 && (
                  <p>No hay productos que coincidan con los filtros.</p>
                )}

                {results.map(p => (
                  <div className="px-2 mb-3" key={p.id}>
                    <ProductCardHorizontalMobile product={p} openProduct={openProduct} />
                  </div>
                ))}
              </div>
            </div>





            </div>

          </div>
        </div>

      </div>

      {/* SORT MODAL (MOBILE) */}
      {showSort && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              
              {/* Header */}
              <div className="modal-header px-3">
                <h5 className="modal-title">Ordenar por</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSort(false)}
                />
              </div>

              {/* Body */}
              <div className="modal-body overflow-auto p-3">
                <SearchSort
                  sort={sort}
                  setSort={setSort}
                  onClose={() => setShowSort(false)}
                />
              </div>

            </div>
          </div>

          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowSort(false)}
          />
        </div>
      )}
      
      {/* FILTERS MODAL (MOBILE) */}
      {showFilters && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">

              {/* Header */}
              <div className="modal-header px-3">
                <h5 className="modal-title">Filtrar</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowFilters(false)}
                />
              </div>

              {/* Body */}
              <div className="modal-body overflow-auto p-3">
                <SearchFilters
                  filters={filters}
                  setFilters={setFilters}
                  toggleFilter={toggleFilter}
                  resetFilters={resetFilters}
                  marcas={marcas}
                  categorias={categorias}
                  accionamientos={accionamientos}
                  descuentos={descuentos}
                />
              </div>

              {/* Footer */}
              <div className="py-3 px-4">

                <button
                  className="btn btn-primary w-100  mb-3"
                  onClick={() => setShowFilters(false)}
                >
                  Ver resultados
                </button>

                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={resetFilters}
                >
                  Limpiar
                </button>
              </div>

            </div>
          </div>

          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowFilters(false)}
          />
        </div>
      )}



    </>

  );
}
