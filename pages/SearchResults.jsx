import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";
import productsData from "@/data/products.json";

import ProductCard from "@/components/ProductCard";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";
import SearchFilters from "@/components/search/SearchFilters";
import SearchSort from "@/components/search/SearchSort";
import SearchSortMobile from "@/components/search/SearchSortMobile";
import {
  EMPTY_FILTERS,
  applyFilters,
  buildFacets,
  hasActiveFilters as checkActiveFilters,
  matchesSearch
} from "@/components/search/filterUtils";

// Duración del skeleton al aplicar filtros u orden
const FILTER_LOADING_MS = 450;
const RESULTS_GRID_CLASS = "row g-2 gx-md-2 gy-md-3 row-cols-2 row-cols-md-4";

export default function SearchResults() {
  const { query } = useParams();
  if (!query?.trim()) return <Navigate to="/" replace />;
  // key: al cambiar la búsqueda se reinician filtros y orden
  return <SearchResultsContent key={query} query={query} />;
}

function SearchResultsContent({ query }) {
  const navigate = useNavigate();
  const [sort, setSortState] = useState("featured");
  const [filters, setFiltersState] = useState(EMPTY_FILTERS);
  const [isFiltering, setIsFiltering] = useState(false);
  const loadingTimer = useRef(null);

  useEffect(() => () => clearTimeout(loadingTimer.current), []);

  // Muestra el skeleton y, al terminar, sube el scroll al inicio de los resultados
  const startFilterLoading = () => {
    setIsFiltering(true);
    clearTimeout(loadingTimer.current);
    loadingTimer.current = setTimeout(() => {
      setIsFiltering(false);
      if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: "smooth" });
    }, FILTER_LOADING_MS);
  };

  const setFilters = (updater) => {
    setFiltersState(updater);
    startFilterLoading();
  };

  const setSort = (value) => {
    setSortState(value);
    startFilterLoading();
  };

  const openProduct = (slug) => navigate(`/product/${slug}`);

  /* =============================
    BÚSQUEDA + FILTRADO
  ============================= */
  const searchResults = useMemo(
    () => productsData.filter(p => matchesSearch(p, query)),
    [query]
  );

  const filteredResults = useMemo(
    () => applyFilters(searchResults, filters),
    [searchResults, filters]
  );

  const facets = useMemo(
    () => buildFacets(searchResults, filters),
    [searchResults, filters]
  );

  /* =============================
    ORDENAMIENTO
  ============================= */
  const results = useMemo(() => {
    const ordered = [...filteredResults];

    switch (sort) {
      case "price_low": ordered.sort((a, b) => a.price - b.price); break;
      case "price_high": ordered.sort((a, b) => b.price - a.price); break;
      case "az": ordered.sort((a, b) => a.title.trim().localeCompare(b.title.trim(), "es")); break;
      case "za": ordered.sort((a, b) => b.title.trim().localeCompare(a.title.trim(), "es")); break;
      case "new": ordered.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case "discount": ordered.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
      case "featured": ordered.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured)); break;
      default: break;
    }

    return ordered;
  }, [filteredResults, sort]);

  /* =============================
    HELPERS
  ============================= */
  const toggleFilter = (group, value) => {
    setFilters(prev => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter(v => v !== value)
        : [...prev[group], value]
    }));
  };

  const resetFilters = () => setFilters(EMPTY_FILTERS);

  const hasActiveFilters = checkActiveFilters(filters);

  const noResults = results.length === 0;
  const noResultsFromSearch = searchResults.length === 0;

    /*MOBILE */
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  return (

    <>
    <div className="container content-space-t-md-1 content-space-b-2">
      <div className="row">


        {/* CONTROLES MOBILE */}
        <div className="d-flex d-lg-none py-3">
            {/* TITULO */}
            <div>
              <h5 className="text-dark mb-2">
                <b>{query}</b>
              </h5>
              {!noResultsFromSearch && (
                <p className="text-dark small mb-0">
                  <b>{results.length}</b> resultados
                </p>
              )}
              </div>
        </div>

        {!noResultsFromSearch && (
          <div className="filters-actions-mobile d-flex d-lg-none gap-2 mb-3">
            <button
              className="filters-btn-mobile w-50"
              onClick={() => setShowFiltersMobile(true)}
            >
              <i className="bi bi-sliders"></i>
              Filtrar
            </button>

            <button className="filters-btn-mobile w-50">
              <i className="bi bi-arrow-down-up"></i>
              <SearchSortMobile sort={sort} setSort={setSort} />
            </button>
          </div>
        )}



        {!noResultsFromSearch && (
          <div className="col-lg-3 d-none d-lg-block pe-md-4">

            {/* TITULO */}
            <div className="mb-3">
              <h3 className="text-dark mb-2">
                <b>{query}</b>
              </h3>
              {!noResultsFromSearch && (
                <h5 className="text-dark">
                  <b>{results.length}</b> resultados
                </h5>
              )}
            </div>

            <SearchFilters
                facets={facets}
                filters={filters}
                setFilters={setFilters}
                toggleFilter={toggleFilter}
                resetFilters={resetFilters}
              />
          </div>
        )}

        {/* RESULTADOS */}
        <div className="col-lg-9 mx-auto">


          {/* SORT (DESKTOP) */}
          <div className="d-none d-lg-flex align-items-center justify-content-end mb-4">
           <SearchSort sort={sort} setSort={setSort} />
          </div>



          {isFiltering && (
            <ProductGridSkeleton
              count={Math.min(Math.max(results.length, 4), 8)}
              rowClassName={RESULTS_GRID_CLASS}
            />
          )}

          {!isFiltering && noResults && (
            <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
              <i className="bi bi-search mb-3" style={{ fontSize: "3rem", opacity: 0.6 }} />

              {noResultsFromSearch ? (
                <>
                  <h4 className="text-dark mb-2">No se encontraron resultados</h4>
                  <p className="text-muted">
                    No hay productos que coincidan con "{query}"
                  </p>
                </>
              ) : (
                <>
                  <h4 className="text-dark mb-2">No hay resultados</h4>
                  <p className="text-muted">
                    Ajusta o elimina los filtros para ver más productos
                  </p>

                  {hasActiveFilters && (
                    <button className="btn btn-primary px-5 font-medium font-15 py-2 mt-3" onClick={resetFilters}>
                      Borrar filtros
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {!isFiltering && !noResults && (
            <div className={RESULTS_GRID_CLASS}>
              {results.map(p => (
                <div className="col" key={p.id}>
                  <ProductCard product={p} openProduct={openProduct} />
                </div>
              ))}
            </div>
          )}

        </div>


      </div>
    </div>
    

    
    {/*MOBILE*/}
    {showFiltersMobile && (
      <>
        {/* Backdrop */}
        <div
          className="mobile-sheet-backdrop"
          onClick={() => setShowFiltersMobile(false)}
        />

        {/* Sheet */}
        <div className="mobile-sheet">

          {/* HEADER */}
          <div className="box-filters-title-sm">
            <h4 className="font-bold mb-0">Filtros</h4>
            <button
              className="btn p-0"
              onClick={() => setShowFiltersMobile(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* BODY (scroll) */}
          <div className="box-filters-body-sm">
            <SearchFilters
              facets={facets}
              filters={filters}
              setFilters={setFilters}
              toggleFilter={toggleFilter}
              resetFilters={resetFilters}
            />
          </div>

          {/* FOOTER */}
          <div className="box-filters-btn-sm">
            <button
              className="btn btn-outline-dark w-100 mb-2"
              onClick={resetFilters}
            >
              Borrar filtros
            </button>

            <button
              className="btn btn-primary w-100"
              onClick={() => setShowFiltersMobile(false)}
            >
              Ver resultados ({results.length})
            </button>
          </div>

        </div>
      </>
)}


    </>

  );
}
