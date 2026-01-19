import { useState } from "react";

import SearchFilterChips from "./SearchFilterChips";


function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        type="button"
        className="btn btn-link text-dark w-100 d-flex justify-content-between align-items-center p-0"
        onClick={() => setOpen(!open)}
      >
        <span className="fw-semibold">{title}</span>
        <i className={`bi bi-chevron-${open ? "up" : "down"}`} />
      </button>

      {open && (
        <div className="mt-2">
          {children}
        </div>
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
    filters.llegaManana ||
    filters.retiroInmediato ||
    filters.compraInternacional;

  return (
    <div>



<div className="mb-4 d-flex flex-column gap-2 bg-white p-3 rounded-2">

  <div className="form-check form-switch d-flex justify-content-between align-items-center mb-2 ps-0">
     <label className="form-check-label">Cuotas sin interés</label>
    <input
      className="form-check-input me-0"
      type="checkbox"
      checked={filters.cuotasSinInteres}
      onChange={() => setFilters(f => ({ ...f, cuotasSinInteres: !f.cuotasSinInteres }))}
    />
   
  </div>

  <div className="form-check form-switch d-flex justify-content-between align-items-center mb-2 ps-0">
    <label className="form-check-label">Envío gratis</label>
    <input
      className="form-check-input me-0"
      type="checkbox"
      checked={filters.envioGratis}
      onChange={() => setFilters(f => ({ ...f, envioGratis: !f.envioGratis }))}
    />
  </div>

  <div className="form-check form-switch d-flex justify-content-between align-items-center mb-2 ps-0">
     <label className="form-check-label">Envío Express</label>
    <input
      className="form-check-input me-0"
      type="checkbox"
      checked={filters.llegaHoy}
      onChange={() => setFilters(f => ({ ...f, llegaHoy: !f.llegaHoy }))}
    />
  </div>

  <div className="form-check form-switch d-flex justify-content-between align-items-center mb-0 ps-0">
    <label className="form-check-label">Retiro inmediato</label>
    <input
      className="form-check-input me-0"
      type="checkbox"
      checked={filters.retiroInmediato}
      onChange={() => setFilters(f => ({ ...f, retiroInmediato: !f.retiroInmediato }))}
    />
  </div>

</div>



      <div>
        {hasActiveFilters && (
          <SearchFilterChips
            filters={filters}
            toggleFilter={toggleFilter}
            resetFilters={resetFilters}
          />
        )}
      </div>



      {/* MARCAS */}
      <FilterGroup title="Marca">
        <div className="d-flex flex-column gap-1">
          {marcas.map(m => {
            const id = `marca-${m}`;
            return (
              <div className="form-check" key={m}>
                <input
                  id={id}
                  className="form-check-input me-0"
                  type="checkbox"
                  checked={filters.marcas.includes(m)}
                  onChange={() => toggleFilter("marcas", m)}
                />
                <label className="form-check-label" htmlFor={id}>
                  {m}
                </label>
              </div>
            );
          })}
        </div>
      </FilterGroup>

      {/* CATEGORÍAS */}
      <FilterGroup title="Categorías">
        <div className="d-flex flex-column gap-1">
          {categorias.map(c => {
            const id = `categoria-${c}`;
            return (
              <div className="form-check" key={c}>
                <input
                  id={id}
                  className="form-check-input me-0"
                  type="checkbox"
                  checked={filters.categorias.includes(c)}
                  onChange={() => toggleFilter("categorias", c)}
                />
                <label className="form-check-label" htmlFor={id}>
                  {c}
                </label>
              </div>
            );
          })}
        </div>
      </FilterGroup>

      {/* ACCIONAMIENTO */}
      <FilterGroup title="Accionamiento">
        <div className="d-flex flex-column gap-1">
          {accionamientos.map(a => {
            const id = `accionamiento-${a}`;
            return (
              <div className="form-check" key={a}>
                <input
                  id={id}
                  className="form-check-input me-0"
                  type="checkbox"
                  checked={filters.accionamiento.includes(a)}
                  onChange={() => toggleFilter("accionamiento", a)}
                />
                <label className="form-check-label" htmlFor={id}>
                  {a}
                </label>
              </div>
            );
          })}
        </div>
      </FilterGroup>

      {/* DESCUENTOS */}
      <FilterGroup title="Descuentos">
        <div className="d-flex flex-column gap-1">
          {descuentos.sort((a, b) => b - a).map(d => {
            const id = `descuento-${d}`;
            return (
              <div className="form-check" key={d}>
                <input
                  id={id}
                  className="form-check-input me-0"
                  type="checkbox"
                  checked={filters.descuentos.includes(d)}
                  onChange={() => toggleFilter("descuentos", d)}
                />
                <label className="form-check-label" htmlFor={id}>
                  {d}% OFF
                </label>
              </div>
            );
          })}
        </div>
      </FilterGroup>

      {/* PRECIO */}
      <FilterGroup title="Precio">
        <div className="d-flex flex-column gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Desde"
            value={filters.precioMin}
            onChange={e => setFilters(prev => ({ ...prev, precioMin: e.target.value }))}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Hasta"
            value={filters.precioMax}
            onChange={e => setFilters(prev => ({ ...prev, precioMax: e.target.value }))}
          />
        </div>
      </FilterGroup>

      {/* RESET */}
      <button
        className="btn btn-sm btn-link px-0 text-primary fw-semibold"
        onClick={resetFilters}
      >
        Borrar filtros
      </button>
    </div>
  );
}
