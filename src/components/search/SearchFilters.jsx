import SearchFilterChips from "./SearchFilterChips";
import FilterList from "./FilterList";
import { hasActiveFilters, isSameRange } from "./filterUtils";

function FilterGroup({ title, items, children }) {
  if (!items.length) return null;
  return (
    <div className="mb-3">
      <p className="text-dark font-bold mb-2">{title}</p>
      {children}
    </div>
  );
}

export default function SearchFilters({
  facets,
  filters,
  setFilters,
  toggleFilter,
  resetFilters
}) {
  const setSingle = (key, value) =>
    setFilters(f => ({ ...f, [key]: f[key] === value ? null : value }));

  const visibleSwitches = facets.switches.filter(s => s.count > 0 || filters[s.key]);

  return (
    <aside>

      {/* SWITCHES */}
      {visibleSwitches.length > 0 && (
        <div className="mb-4 pt-0 pb-3 py-md-3 px-0 px-md-3 bg-white rounded-2 d-flex flex-column row-gap-3 border-bottom">
          {visibleSwitches.map(({ key, label }) => (
            <div
              key={key}
              className="form-switch form-check switch-filters d-flex justify-content-between align-items-center ps-0"
            >
              <label className="form-check-label" htmlFor={`switch-${key}`}>{label}</label>

              <input
                id={`switch-${key}`}
                className="form-check-input"
                type="checkbox"
                checked={filters[key]}
                onChange={() => setFilters(f => ({ ...f, [key]: !f[key] }))}
              />
            </div>
          ))}
        </div>
      )}

      {/* CHIPS */}
      {hasActiveFilters(filters) && (
        <SearchFilterChips
          filters={filters}
          setFilters={setFilters}
          toggleFilter={toggleFilter}
          resetFilters={resetFilters}
        />
      )}

      <FilterGroup title="Categoría" items={facets.categorias}>
        <FilterList
          items={facets.categorias}
          selected={filters.categorias}
          onToggle={v => toggleFilter("categorias", v)}
        />
      </FilterGroup>

      <FilterGroup title="Marca" items={facets.marcas}>
        <FilterList
          items={facets.marcas}
          selected={filters.marcas}
          onToggle={v => toggleFilter("marcas", v)}
        />
      </FilterGroup>

      <FilterGroup title="Accionamiento" items={facets.accionamiento}>
        <FilterList
          items={facets.accionamiento}
          selected={filters.accionamiento}
          onToggle={v => toggleFilter("accionamiento", v)}
        />
      </FilterGroup>

      <FilterGroup title="Descuentos" items={facets.descuentos}>
        <FilterList
          items={facets.descuentos}
          selected={filters.descuento ? [filters.descuento] : []}
          onToggle={v => setSingle("descuento", v)}
        />
      </FilterGroup>

      <FilterGroup title="Cantidad de cuotas" items={facets.cuotas}>
        <FilterList
          items={facets.cuotas}
          selected={filters.cuotas}
          onToggle={v => toggleFilter("cuotas", v)}
        />
      </FilterGroup>

      <FilterGroup title="Precio" items={facets.precios}>
        <div className="d-flex flex-column gap-1">
          {facets.precios.map(r => {
            const checked = isSameRange(filters.precio, r);
            return (
              <label
                key={`${r.min}-${r.max}`}
                className="form-check font-medium small text-dark d-flex align-items-center"
              >
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setFilters(f => ({
                      ...f,
                      precio: checked ? null : { min: r.min, max: r.max, label: r.label }
                    }))
                  }
                />
                <span>
                  {r.label}
                  <span className="text-dark ms-1">({r.count})</span>
                </span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* RESET */}
      {hasActiveFilters(filters) && (
        <button
          className="btn btn-sm btn-link px-0 fw-semibold d-none d-md-block"
          onClick={resetFilters}
        >
          Borrar filtros
        </button>
      )}
    </aside>
  );
}
