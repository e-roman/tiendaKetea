import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();

  const openProduct = (id) => navigate(`/product/${id}`);

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
  const results = useMemo(() => {
    return productsData.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const catLower = (p.categories || []).map(c => c.toLowerCase());

      // Búsqueda por texto
      if (!title.includes(searchTerm) && !catLower.some(c => c.includes(searchTerm))) {
        return false;
      }

      // Filtro precio mínimo
      if (filters.precioMin && p.price < Number(filters.precioMin)) {
        return false;
      }

      // Filtro precio máximo
      if (filters.precioMax && p.price > Number(filters.precioMax)) {
        return false;
      }

      // Filtro marca
      if (filters.marcas.length > 0 && !filters.marcas.includes(p.Marca)) {
        return false;
      }

      // Filtro categorías
      if (filters.categorias.length > 0 && !p.categories?.some(cat => filters.categorias.includes(cat))) {
        return false;
      }

      // Filtro accionamiento
      if (filters.accionamiento.length > 0 && !filters.accionamiento.includes(p.accionamiento)) {
        return false;
      }

      // Filtro descuento
      if (filters.descuentos.length > 0 && !filters.descuentos.includes(p.discount)) {
        return false;
      }

      return true;
    });
  }, [searchTerm, filters]);

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
          <h4 className="mb-0">Resultados para: "{query}"</h4>
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
