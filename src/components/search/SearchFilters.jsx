import { useState } from "react";
import SearchFilterChips from "./SearchFilterChips";

/* ============================= */
/* RANGOS DE PRECIO              */
/* ============================= */
const priceRanges = [
  { id: "lt-85430", label: "Menos de $ 85.430", count: 199, min: 0, max: 85430 },
  { id: "85430-199990", label: "$ 85.430 a $ 199.990", count: 196, min: 85430, max: 199990 },
  { id: "gt-199990", label: "$ 199.990 o más", count: 205, min: 199990, max: null }
];

/* ============================= */
/* LISTA REUTILIZABLE DE FILTROS */
/* ============================= */
function FilterList({ items, selected, onToggle, maxVisible = 8 }) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, maxVisible);

  return (
    <>
      <div className="check-filter-result d-flex flex-column gap-1">
        {visibleItems.map((item, index) => (
          <label
            key={`${item.value}-${index}`}
            className="form-check small"
          >
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={selected.includes(item.value)}
              onChange={() => onToggle(item.value)}
            />
            {item.label}{" "}
            <span className="text-muted">({item.count})</span>
          </label>
        ))}
      </div>

      {items.length > maxVisible && (
        <button
          type="button"
          className="btn btn-link px-0 mt-0 font-15"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </>
  );
}

/* ============================= */
/* SEARCH FILTERS (GRANDE)       */
/* ============================= */
export default function SearchFilters({
  filters,
  setFilters,
  toggleFilter,
  resetFilters,
  marcas,
  categorias,
  accionamientos,
  descuentos
}) {
  const hasActiveFilters =
    filters.marcas.length ||
    filters.categorias.length ||
    filters.accionamiento.length ||
    filters.descuentos.length ||
    filters.precioMin ||
    filters.precioMax ||
    filters.cuotasSinInteres ||
    filters.envioGratis ||
    filters.llegaHoy ||
    filters.retiroInmediato;

  return (
    <aside>

      {/* SWITCHES RÁPIDOS */}
      <div className="mb-4 bg-white p-3 rounded-2 d-flex flex-column row-gap-3">
        {[
          ["Cuotas sin interés", "cuotasSinInteres"],
          ["Envío gratis", "envioGratis"],
          ["Envío Express", "llegaHoy"],
          ["Retiro inmediato", "retiroInmediato"]
        ].map(([label, key]) => (
          <div
            key={key}
            className="form-check form-switch d-flex justify-content-between align-items-center ps-0"
          >
            <label className="form-check-label">{label}</label>
            <input
              className="form-check-input"
              type="checkbox"
              checked={filters[key]}
              onChange={() =>
                setFilters(f => ({ ...f, [key]: !f[key] }))
              }
            />
          </div>
        ))}
      </div>

      {/* CHIPS */}
      {hasActiveFilters && (
        <SearchFilterChips
          filters={filters}
          toggleFilter={toggleFilter}
          resetFilters={resetFilters}
        />
      )}

      {/* MARCA */}
      <div className="mb-4">
        <p className="text-dark font-bold mb-2">Marca</p>
        <FilterList
          items={marcas.map(m => ({
            value: m,
            label: m,
            count: 0 // o el count real después
          }))}
          selected={filters.marcas}
          onToggle={v => toggleFilter("marcas", v)}
        />
      </div>

      {/* CATEGORÍA */}
      <div className="mb-4">
        <p className="text-dark font-bold mb-2">Categoría</p>
        <FilterList
            items={categorias.map(c => ({
              value: c,
              label: c,
              count: 0
            }))}
            selected={filters.categorias}
            onToggle={v => toggleFilter("categorias", v)}
          />

      </div>

      {/* ACCIONAMIENTO */}
      <div className="mb-4">
        <p className="text-dark font-bold mb-2">Accionamiento</p>
        <FilterList
          items={accionamientos.map(a => ({
            value: a,
            label: a,
            count: 0
          }))}
          selected={filters.accionamiento}
          onToggle={v => toggleFilter("accionamiento", v)}
        />
      </div>

      {/* DESCUENTOS */}
      <div className="mb-4">
        <p className="text-dark font-bold mb-2">Descuentos</p>
        <FilterList
          items={descuentos.map(d => ({
            value: d,
            label: `Desde ${d}% OFF`,
            count: 0
          }))}
          selected={filters.descuentos}
          onToggle={v => toggleFilter("descuentos", v)}
        />
      </div>

      {/* PRECIO */}
      <div className="mb-4">
        <p className="text-dark font-bold mb-2">Precio</p>

        {/* RANGOS */}
        <div className="d-flex flex-column gap-1 mb-2">
          {priceRanges.map(range => (
            <label key={range.id} className="form-check small">
              <input
                className="form-check-input me-2"
                type="radio"
                name="priceRange"
                checked={
                  filters.precioMin === range.min &&
                  filters.precioMax === range.max
                }
                onChange={() =>
                  setFilters(f => ({
                    ...f,
                    precioMin: range.min,
                    precioMax: range.max
                  }))
                }
              />
              {range.label}{" "}
              <span className="text-muted">({range.count})</span>
            </label>
          ))}
        </div>

        {/* MIN / MAX */}
        <div className="d-flex align-items-center gap-2">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Min"
            value={filters.precioMin ?? ""}
            onChange={e =>
              setFilters(f => ({ ...f, precioMin: Number(e.target.value) }))
            }
          />

          <span className="text-muted">-</span>

          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Max"
            value={filters.precioMax ?? ""}
            onChange={e =>
              setFilters(f => ({ ...f, precioMax: Number(e.target.value) }))
            }
          />

          <button type="button" className="btn btn-sm btn-primary">
            →
          </button>
        </div>
      </div>

      {/* RESET */}
      <button
        className="btn btn-sm btn-link px-0 text-primary fw-semibold"
        onClick={resetFilters}
      >
        Borrar filtros
      </button>

    </aside>
  );
}
