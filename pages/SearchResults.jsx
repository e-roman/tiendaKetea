import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import productsData from "@/data/products.json";

import ProductCard from "@/components/ProductCard";
import ProductCardHorizontal from "@/components/ProductCardHorizontal";
import ProductCardHorizontalMobile from "@/components/ProductCardHorizontalMobile";
import SearchFilters from "@/components/search/SearchFilters";
import SearchSort from "@/components/search/SearchSort";

export default function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();

  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sort, setSort] = useState("featured");

  const [filters, setFilters] = useState({
    marcas: [],
    categorias: [],
    accionamiento: [],
    descuentos: [],
    precioMin: "",
    precioMax: ""
  });

  const openProduct = (slug) => navigate(`/product/${slug}`);

  const searchTerm = (query || "").toLowerCase().trim();

  /* =============================
    OPCIONES DINÁMICAS
  ============================= */
  const marcas = [...new Set(productsData.map(p => p.Marca).filter(Boolean))];
  const categorias = [...new Set(productsData.flatMap(p => p.categories || []))];
  const accionamientos = [...new Set(productsData.map(p => p.accionamiento).filter(Boolean))];
  const descuentos = [...new Set(productsData.map(p => p.discount).filter(d => d > 0))].sort((a, b) => a - b);

  /* =============================
    FILTRADO
  ============================= */
  const filteredResults = useMemo(() => {
    return productsData.filter(p => {
      const title = p.title?.toLowerCase() || "";
      const cats = (p.categories || []).map(c => c.toLowerCase());

      if (!title.includes(searchTerm) && !cats.some(c => c.includes(searchTerm))) return false;
      if (filters.precioMin && p.price < Number(filters.precioMin)) return false;
      if (filters.precioMax && p.price > Number(filters.precioMax)) return false;
      if (filters.marcas.length && !filters.marcas.includes(p.Marca)) return false;
      if (filters.categorias.length && !p.categories?.some(c => filters.categorias.includes(c))) return false;
      if (filters.accionamiento.length && !filters.accionamiento.includes(p.accionamiento)) return false;
      if (filters.descuentos.length && !filters.descuentos.includes(p.discount)) return false;

      return true;
    });
  }, [searchTerm, filters]);

  /* =============================
    ORDENAMIENTO
  ============================= */
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
      case "new":
        ordered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "discount":
        ordered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "featured":
        ordered.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        break;
      default:
        break;
    }

    return ordered;
  }, [filteredResults, sort]);

  /* =============================
    HELPERS
  ============================= */
  const toggleFilter = (group, value) => {
    setFilters(prev => {
      const exists = prev[group].includes(value);
      return {
        ...prev,
        [group]: exists
          ? prev[group].filter(v => v !== value)
          : [...prev[group], value]
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

  const hasActiveFilters = useMemo(() => {
    return (
      filters.marcas.length ||
      filters.categorias.length ||
      filters.accionamiento.length ||
      filters.descuentos.length ||
      Boolean(filters.precioMin) ||
      Boolean(filters.precioMax)
    );
  }, [filters]);

  const noResults = results.length === 0;
  const noResultsFromSearch = noResults && !hasActiveFilters;
  const noResultsFromFilters = noResults && hasActiveFilters;

  /* =============================
    RENDER
  ============================= */
  return (
    <>
      <div className="container content-space-t-md-1 content-space-b-2 px-mobile">
        <div className="row">

          {!noResultsFromSearch && (
            <div className="col-lg-3 d-none d-lg-block">
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
          )}

          <div className="col-lg-9">

            {!noResultsFromSearch && (
              <>
               <div className="row align-items-center mb-1">
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-3">

                  <div className="col-sm mb-3 mb-sm-0">
                     <h5 className="mb-0">Productos: <b>"{query}"</b> ({results.length}) </h5>
                  </div>

                  <div className="col-sm-auto d-none d-lg-block">
                    <div className="d-flex align-items-center gap-2 mb-2 mb-sm-0 me-sm-2">
                      <div className="d-flex">
                        <div className="d-flex align-items-center w-100 pe-2" ><span>Ordenar por:</span></div>
                        <select
                        style={{minWidth: "190px"}}
                          className="form-select"
                          value={sort}
                          onChange={e => setSort(e.target.value)}
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

                      <div className="nav nav-segment d-flex">
                        <button
                          className={`nav-link ${view === "grid" ? "active" : ""}`}
                          onClick={() => setView("grid")}
                        >
                          <i className="bi-grid-fill" />
                        </button>
                        <button
                          className={`nav-link ${view === "list" ? "active" : ""}`}
                          onClick={() => setView("list")}
                        >
                          <i className="bi-list" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CHIPS */}
                {hasActiveFilters && (
                  <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
                    <div className="col-sm rowChips">
                      <div className="d-flex gap-2 flex-wrap">
                        {filters.marcas.map(m => (
                          <button key={`marca-${m}`} className="chip" onClick={() => toggleFilter("marcas", m)}>
                            {m}<span className="icon-inline chip-remove-icon chip-close" />
                          </button>
                        ))}

                        {filters.categorias.map(c => (
                          <button key={`cat-${c}`} className="chip" onClick={() => toggleFilter("categorias", c)}>
                            {c}<span className="icon-inline chip-remove-icon chip-close" />
                          </button>
                        ))}

                        {filters.accionamiento.map(a => (
                          <button key={`acc-${a}`} className="chip" onClick={() => toggleFilter("accionamiento", a)}>
                            {a}<span className="icon-inline chip-remove-icon chip-close" />
                          </button>
                        ))}

                        {filters.descuentos.map(d => (
                          <button key={`desc-${d}`} className="chip" onClick={() => toggleFilter("descuentos", d)}>
                            {d}% OFF<span className="icon-inline chip-remove-icon chip-close" />
                          </button>
                        ))}

                        {filters.precioMin && (
                          <button className="chip" onClick={() => setFilters(p => ({ ...p, precioMin: "" }))}>
                            Desde ${filters.precioMin}<span className="icon-inline chip-remove-icon chip-close" />
                          </button>
                        )}

                        {filters.precioMax && (
                          <button className="chip" onClick={() => setFilters(p => ({ ...p, precioMax: "" }))}>
                            Hasta ${filters.precioMax}<span className="icon-inline chip-remove-icon chip-close" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-sm-auto">
                      <button className="btn btn-link p-0 mt-1" onClick={resetFilters}>
                        Borrar filtros
                      </button>
                    </div>
                  </div>
                )}
                </div>
              </>
            )}

            {/* NO RESULTS */}
            {noResults && (
              <div className="text-center py-5">
                <div className="mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown-icon lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                </div>
                <h3>No se encontraron resultados para "{query}"</h3>
                <p className="text-muted mb-4">
                  Te recomendamos revisar la escritura de la palabra,<br/>
                  buscar un término distinto o navegar por las categorías.
                </p>
                {/* {noResultsFromFilters && (
                  <button className="btn btn-outline-primary mt-3" onClick={resetFilters}>
                    Limpiar filtros
                  </button>
                )} */}
              </div>
            )}

            {/* RESULTS */}
            {!noResults && (
              view === "grid" ? (
                <div className="row">
                  {results.map(p => (
                    <div className="col-lg-4 mb-3" key={p.id}>
                      <ProductCard product={p} openProduct={openProduct} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row">
                  {results.map(p => (
                    <div className="mb-2" key={p.id}>
                      <ProductCardHorizontal product={p} openProduct={openProduct} />
                    </div>
                  ))}
                </div>
              )
            )}

            {/* MOBILE */}
            <div className="d-lg-none mt-3">
              {results.map(p => (
                <div key={p.id} className="mb-3">
                  <ProductCardHorizontalMobile product={p} openProduct={openProduct} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* MODALS */}
      {showSort && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Ordenar</h5>
                <button className="btn-close" onClick={() => setShowSort(false)} />
              </div>
              <div className="modal-body">
                <SearchSort sort={sort} setSort={setSort} onClose={() => setShowSort(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showFilters && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Filtrar</h5>
                <button className="btn-close" onClick={() => setShowFilters(false)} />
              </div>
              <div className="modal-body">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
