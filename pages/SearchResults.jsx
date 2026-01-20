import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import productsData from "@/data/products.json";

import ProductCard from "@/components/ProductCard";
import SearchFilters from "@/components/search/SearchFilters";
import SearchSort from "@/components/search/SearchSort";
import SearchSortMobile from "@/components/search/SearchSortMobile";

export default function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();

if (!query) {
  navigate("/");
  return null;
}

  const [sort, setSort] = useState("featured");

const [filters, setFilters] = useState({
  marcas: [],
  categorias: [],
  accionamiento: [],
  descuentos: [],
  cuotasCantidad: [],
  precioMin: "",
  precioMax: "",
  cuotasSinInteres: false,
  envioGratis: false,
  llegaManana: false,
  llegaHoy: false,
  retiroInmediato: false,
  compraInternacional: false
});


  const openProduct = (slug) => navigate(`/product/${slug}`);
  const searchTerm = (query || "").toLowerCase().trim();

  /* =============================
    OPCIONES
  ============================= */
  const marcas = [...new Set(productsData.map(p => p.Marca).filter(Boolean))];
  const categorias = [...new Set(productsData.flatMap(p => p.categories || []))];
  const accionamientos = [...new Set(productsData.map(p => p.accionamiento).filter(Boolean))];
  const descuentos = [...new Set(productsData.map(p => p.discount).filter(d => d > 0))];

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

    // ESTE ERA EL QUE FALTABA
    if (
      filters.cuotasCantidad.length &&
      !filters.cuotasCantidad.includes(p.cuotasLabel)
    ) return false;

    if (filters.envioGratis && !p.envioGratis) return false;
    if (filters.cuotasSinInteres && !p.cuotasSinInteres) return false;
    if (filters.llegaHoy && !p.llegaHoy) return false;
    if (filters.llegaManana && !p.llegaManana) return false;
    if (filters.retiroInmediato && !p.retiroInmediato) return false;
    if (filters.compraInternacional && !p.compraInternacional) return false;

    return true;
  });
}, [searchTerm, filters]);


  /* =============================
    ORDENAMIENTO
  ============================= */
  const results = useMemo(() => {
    const ordered = [...filteredResults];

    switch (sort) {
      case "price_low": ordered.sort((a, b) => a.price - b.price); break;
      case "price_high": ordered.sort((a, b) => b.price - a.price); break;
      case "az": ordered.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "za": ordered.sort((a, b) => b.title.localeCompare(a.title)); break;
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

const resetFilters = () => {
  setFilters({
    marcas: [],
    categorias: [],
    accionamiento: [],
    descuentos: [],
    cuotasCantidad: [], 
    precioMin: "",
    precioMax: "",
    cuotasSinInteres: false,
    envioGratis: false,
    llegaManana: false,
    llegaHoy: false,
    retiroInmediato: false,
    compraInternacional: false
  });
};

  const hasActiveFilters = useMemo(() => (
    filters.marcas.length ||
    filters.categorias.length ||
    filters.accionamiento.length ||
    filters.descuentos.length ||
    filters.precioMin ||
    filters.precioMax ||
    filters.cuotasSinInteres ||
    filters.envioGratis ||
    filters.llegaHoy ||
    filters.llegaManana ||
    filters.retiroInmediato ||
    filters.compraInternacional
  ), [filters]);

  const noResults = results.length === 0;
  const noResultsFromSearch = noResults && !hasActiveFilters;

    /*MOBILE */
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showSortMobile, setShowSortMobile] = useState(false);

  return (

    <>
    <div className="container content-space-t-md-1 content-space-b-2 px-mobile">
      <div className="row">


        {/* CONTROLES MOBILE */}
        <div className="d-flex d-lg-none gap-2 mb-3">
          <button
            className="btn btn-outline-dark w-50"
            onClick={() => setShowFiltersMobile(true)}
          >
            <i className="bi bi-sliders me-1" />
            Filtros
          </button>
          
          <div className="btn btn-outline-dark w-50">
            <i className="bi bi-arrow-down-up me-1" />
            <SearchSortMobile sort={sort} setSort={setSort} />
          </div>
        </div>



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
                products={productsData}  
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



          {noResults && (
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

          {!noResults && (
            <div className="row g-2 g-md-3 row-cols-2 row-cols-md-3">
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
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Filtros</h5>
            <button
              className="btn p-0"
              onClick={() => setShowFiltersMobile(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <SearchFilters
            products={productsData}
            filters={filters}
            setFilters={setFilters}
            toggleFilter={toggleFilter}
            resetFilters={resetFilters}
          />

          <div className="pt-3 border-top mt-3">
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
