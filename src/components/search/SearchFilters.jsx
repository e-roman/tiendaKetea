import { useState } from "react";

function FilterCollapse({ title, items, renderItem, limit = 7 }) {
  const [open, setOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? items : items.slice(0, limit);

  return (
    <div className="border-bottom pb-1 mb-3">
      <button
        type="button"
        className="btn w-100 d-flex justify-content-between align-items-center px-0"
        onClick={() => setOpen(!open)}
      >
        <h5 className="mb-0">{title}</h5>
        <i className={`bi bi-chevron-${open ? "up" : "down"}`} />
      </button>

      {open && (
        <>
          <div className="mt-2">
            {visibleItems.map(renderItem)}
          </div>

          {items.length > limit && (
            <button
              type="button"
              className="btn btn-link px-0 mt-2"
              onClick={() => setShowAll(v => !v)}
            >
              {showAll ? "Ver menos" : "Ver más"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

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
  return (
    <div>

      {/* MARCAS */}
      <FilterCollapse
        title="Marca"
        items={marcas}
        renderItem={(m) => {
          const id = `marca-${m}`;
          return (
            <div className="form-check" key={m}>
              <input
                id={id}
                className="form-check-input"
                type="checkbox"
                checked={filters.marcas.includes(m)}
                onChange={() => toggleFilter("marcas", m)}
              />
              <label className="form-check-label" htmlFor={id}>
                {m}
              </label>
            </div>
          );
        }}
      />

      {/* ACCIONAMIENTO */}
      <FilterCollapse
        title="Accionamiento"
        items={accionamientos}
        renderItem={(a) => {
          const id = `accionamiento-${a}`;
          return (
            <div className="form-check" key={a}>
              <input
                id={id}
                className="form-check-input"
                type="checkbox"
                checked={filters.accionamiento.includes(a)}
                onChange={() => toggleFilter("accionamiento", a)}
              />
              <label className="form-check-label" htmlFor={id}>
                {a}
              </label>
            </div>
          );
        }}
      />

      {/* DESCUENTOS */}
      <FilterCollapse
        title="Descuentos"
        items={descuentos}
        renderItem={(d) => {
          const id = `descuento-${d}`;
          return (
            <div className="form-check" key={d}>
              <input
                id={id}
                className="form-check-input"
                type="checkbox"
                checked={filters.descuentos.includes(d)}
                onChange={() => toggleFilter("descuentos", d)}
              />
              <label className="form-check-label" htmlFor={id}>
                {d}% OFF
              </label>
            </div>
          );
        }}
      />

      {/* CATEGORÍAS */}
      <FilterCollapse
        title="Categorías"
        items={categorias}
        renderItem={(c) => {
          const id = `categoria-${c}`;
          return (
            <div className="form-check" key={c}>
              <input
                id={id}
                className="form-check-input"
                type="checkbox"
                checked={filters.categorias.includes(c)}
                onChange={() => toggleFilter("categorias", c)}
              />
              <label className="form-check-label" htmlFor={id}>
                {c}
              </label>
            </div>
          );
        }}
      />

      {/* PRECIO (sin collapse de items) */}
      <div className="border-bottom pb-4 mb-4">
        <h5 className="pb-2">Precio</h5>

        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control priceMm"
            placeholder="Mínimo"
            value={filters.precioMin}
            onChange={(e) =>
              setFilters(prev => ({ ...prev, precioMin: e.target.value }))
            }
          />
          <input
            type="number"
            className="form-control priceMm"
            placeholder="Máximo"
            value={filters.precioMax}
            onChange={(e) =>
              setFilters(prev => ({ ...prev, precioMax: e.target.value }))
            }
          />
        </div>
      </div>

      <button
        className="btn btn-sm btn-border border-primary text-primary w-100 d-none d-lg-block"
        onClick={resetFilters}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
