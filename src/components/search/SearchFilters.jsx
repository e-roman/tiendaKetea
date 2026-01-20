import { useMemo } from "react";
import SearchFilterChips from "./SearchFilterChips";
import FilterList from "./FilterList";

/* ============================= */
/* RANGOS DE PRECIO              */
/* ============================= */
const priceRanges = [
  { id: "lt-85430", label: "Menos de $ 85.430", min: 0, max: 85430 },
  { id: "85430-199990", label: "$ 85.430 a $ 199.990", min: 85430, max: 199990 },
  { id: "gt-199990", label: "$ 199.990 o más", min: 199990, max: null }
];

export default function SearchFilters({
  products = [],
  filters,
  setFilters,
  toggleFilter,
  resetFilters
}) {

  /* ============================= */
  /* DATOS DERIVADOS DEL JSON      */
  /* ============================= */

  const marcas = useMemo(() => {
    const map = {};
    products.forEach(p => {
      if (!p.Marca) return;
      map[p.Marca] = (map[p.Marca] || 0) + 1;
    });
    return Object.entries(map).map(([value, count]) => ({
      value,
      label: value,
      count
    }));
  }, [products]);

  const categorias = useMemo(() => {
    const map = {};
    products.forEach(p => {
      (p.categories || []).forEach(cat => {
        const key = cat.toLowerCase();
        if (["ofertas", "destacados"].includes(key)) return;
        map[key] = (map[key] || 0) + 1;
      });
    });
    return Object.entries(map).map(([value, count]) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
      count
    }));
  }, [products]);

  const accionamientos = useMemo(() => {
    const map = {};
    products.forEach(p => {
      if (!p.accionamiento) return;
      map[p.accionamiento] = (map[p.accionamiento] || 0) + 1;
    });
    return Object.entries(map).map(([value, count]) => ({
      value,
      label: value,
      count
    }));
  }, [products]);

  const descuentos = useMemo(() => {
    const map = {};
    products.forEach(p => {
      if (!p.discount) return;
      map[p.discount] = (map[p.discount] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[0] - a[0])
      .map(([value, count]) => ({
        value: Number(value),
        label: `Desde ${value}% OFF`,
        count
      }));
  }, [products]);

  const cuotasCantidad = useMemo(() => {
    const map = {};
    products.forEach(p => {
      if (!p.cuotasLabel) return;
      map[p.cuotasLabel] = (map[p.cuotasLabel] || 0) + 1;
    });
    return Object.entries(map).map(([value, count]) => ({
      value,
      label: value,
      count
    }));
  }, [products]);

  const allCuotasValues = useMemo(
    () => cuotasCantidad.map(c => c.value),
    [cuotasCantidad]
  );

  /* ============================= */
  /* ESTADO ACTIVO                 */
  /* ============================= */

  const hasActiveFilters =
    filters.marcas.length ||
    filters.categorias.length ||
    filters.accionamiento.length ||
    filters.descuentos.length ||
    filters.cuotasCantidad.length ||
    filters.precioMin ||
    filters.precioMax ||
    filters.cuotasSinInteres ||
    filters.envioGratis ||
    filters.llegaHoy ||
    filters.retiroInmediato;

  return (
    <aside>

      {/* SWITCHES */}
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
              onChange={() => {
                if (key === "cuotasSinInteres") {
                  setFilters(f => ({
                    ...f,
                    cuotasSinInteres: !f.cuotasSinInteres,
                    cuotasCantidad: !f.cuotasSinInteres
                      ? allCuotasValues
                      : []
                  }));
                } else {
                  setFilters(f => ({ ...f, [key]: !f[key] }));
                }
              }}
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
      <div className="mb-3">
        <p className="text-dark font-bold mb-2">Marca</p>
        <FilterList
          items={marcas}
          selected={filters.marcas}
          onToggle={v => toggleFilter("marcas", v)}
        />
      </div>

      {/* CATEGORÍA */}
      <div className="mb-3">
        <p className="text-dark font-bold mb-2">Categoría</p>
        <FilterList
          items={categorias}
          selected={filters.categorias}
          onToggle={v => toggleFilter("categorias", v)}
        />
      </div>

      {/* ACCIONAMIENTO */}
      <div className="mb-3">
        <p className="text-dark font-bold mb-2">Accionamiento</p>
        <FilterList
          items={accionamientos}
          selected={filters.accionamiento}
          onToggle={v => toggleFilter("accionamiento", v)}
        />
      </div>

      {/* DESCUENTOS */}
      <div className="mb-3">
        <p className="text-dark font-bold mb-2">Descuentos</p>
        <FilterList
          items={descuentos}
          selected={filters.descuentos}
          onToggle={v => toggleFilter("descuentos", v)}
        />
      </div>

      {/* CUOTAS */}
      <div className="mb-3">
        <p className="text-dark font-bold mb-2">Cantidad de cuotas</p>
        <FilterList
          items={cuotasCantidad}
          selected={filters.cuotasCantidad}
          onToggle={v => toggleFilter("cuotasCantidad", v)}
        />
      </div>

      {/* PRECIO */}
      <div className="mb-4">
        <p className="text-dark font-bold mb-2">Precio</p>

        {priceRanges.map(r => (
          <label key={r.id} className="form-check small">
            <input
              className="form-check-input me-2"
              type="radio"
              name="price"
              checked={
                filters.precioMin === r.min &&
                filters.precioMax === r.max
              }
              onChange={() =>
                setFilters(f => ({
                  ...f,
                  precioMin: r.min,
                  precioMax: r.max
                }))
              }
            />
            {r.label}
          </label>
        ))}
      </div>

      {/* RESET */}
      <button
        className="btn btn-sm btn-link px-0 fw-semibold"
        onClick={resetFilters}
      >
        Borrar filtros
      </button>
    </aside>
  );
}
