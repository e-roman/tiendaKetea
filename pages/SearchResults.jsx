import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
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
    <div>

      {/* BREADCRUMB */}
      <div className="bg-light">
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
      </div>

      <div className="container content-space-t-1 content-space-b-2">
        <div className="row">

          {/* LATERAL FILTROS */}
          <div className="col-lg-3">

            <div className="border-bottom pb-4 mb-4">
              <h5 className="pb-2">Precio</h5>

              <input
                type="number"
                className="form-control mb-2"
                placeholder="Desde $"
                value={filters.precioMin}
                onChange={(e) => setFilters({ ...filters, precioMin: e.target.value })}
              />

              <input
                type="number"
                className="form-control"
                placeholder="Hasta $"
                value={filters.precioMax}
                onChange={(e) => setFilters({ ...filters, precioMax: e.target.value })}
              />
            </div>

            {/* MARCA */}
            <div className="border-bottom pb-4 mb-4">
              <h5 className="pb-2">Marca</h5>
              {marcas.map((m) => (
                <div className="form-check" key={m}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={filters.marcas.includes(m)}
                    onChange={() => toggleFilter("marcas", m)}
                  />
                  <label className="form-check-label">{m}</label>
                </div>
              ))}
            </div>

            {/* ACCIONAMIENTO */}
            <div className="border-bottom pb-4 mb-4">
              <h5 className="pb-2">Accionamiento</h5>
              {accionamientos.map((a) => (
                <div className="form-check" key={a}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={filters.accionamiento.includes(a)}
                    onChange={() => toggleFilter("accionamiento", a)}
                  />
                  <label className="form-check-label">{a}</label>
                </div>
              ))}
            </div>

            {/* DESCUENTOS */}
            <div className="border-bottom pb-4 mb-4">
              <h5 className="pb-2">Descuentos</h5>
              {descuentos.map((d) => (
                <div className="form-check" key={d}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={filters.descuentos.includes(d)}
                    onChange={() => toggleFilter("descuentos", d)}
                  />
                  <label className="form-check-label">{d}% OFF</label>
                </div>
              ))}
            </div>

            {/* CATEGORÍAS */}
            <div className="border-bottom pb-4 mb-4">
              <h5 className="pb-2">Categorías</h5>
              {categorias.map((c) => (
                <div className="form-check" key={c}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={filters.categorias.includes(c)}
                    onChange={() => toggleFilter("categorias", c)}
                  />
                  <label className="form-check-label">{c}</label>
                </div>
              ))}
            </div>

            {/* RESET */}
            <button className="btn btn-sm btn-secondary w-100" onClick={resetFilters}>
              Borrar filtros
            </button>

          </div>



          {/* RESULTADOS */}
          <div className="col-lg-9">
          <div className="row align-items-center mb-5">
            <div className="col-sm mb-3 mb-sm-0">
              <h6 className="mb-0">{results.length} productos</h6>
            </div>

            <div className="col-sm-auto">
              <div className="d-sm-flex justify-content-sm-end align-items-center">
                {/*!-- Select --*/}
                <div className="d-flex align-items-center gap-2 mb-2 mb-sm-0 me-sm-2">
                  {/*!-- Select Wrapper --*/}
                  <div>Ordenar por</div>
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
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      <i className="bi-grid-fill"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="bi-list"></i>
                    </a>
                  </li>
                </ul>
                {/*!-- End Nav --*/}
              </div>
            </div>
          </div>



            <div className="row row-cols-sm-2 row-cols-md-3 mb-10">

              {results.length === 0 && (
                <p>No hay productos que coincidan con los filtros.</p>
              )}

              {results.map((p) => (
                <div className="col mb-4" key={p.id}>
                  <ProductCard product={p} openProduct={openProduct} />
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
