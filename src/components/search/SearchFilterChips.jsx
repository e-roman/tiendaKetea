import { SWITCHES } from "./filterUtils";

function Chip({ label, onRemove }) {
  return (
    <button className="chip" onClick={onRemove}>
      {label}
      <span className="icon-inline chip-remove-icon chip-close" />
    </button>
  );
}

export default function SearchFilterChips({
  filters,
  setFilters,
  toggleFilter,
  resetFilters
}) {
  const clear = (key, value) => setFilters(f => ({ ...f, [key]: value }));

  return (
    <div className="mb-3 rowChips">
      <div className="d-flex align-items-center mb-2">
        <h5 className="font-bold text-dark mb-0 pe-2">
          Filtros aplicados:
        </h5>
        <button
          className="btn btn-link p-0 font-14"
          onClick={resetFilters}
        >
          Borrar
        </button>
      </div>

      <div className="d-flex flex-wrap row-gap-2 mb-2">
        {SWITCHES.filter(s => filters[s.key]).map(s => (
          <Chip key={s.key} label={s.label} onRemove={() => clear(s.key, false)} />
        ))}

        {filters.categorias.map(c => (
          <Chip key={`cat-${c}`} label={c} onRemove={() => toggleFilter("categorias", c)} />
        ))}

        {filters.marcas.map(m => (
          <Chip key={`marca-${m}`} label={m} onRemove={() => toggleFilter("marcas", m)} />
        ))}

        {filters.accionamiento.map(a => (
          <Chip key={`acc-${a}`} label={a} onRemove={() => toggleFilter("accionamiento", a)} />
        ))}

        {filters.descuento && (
          <Chip label={`Desde ${filters.descuento}% OFF`} onRemove={() => clear("descuento", null)} />
        )}

        {filters.cuotas.map(n => (
          <Chip key={`cuota-${n}`} label={`${n} cuotas sin interés`} onRemove={() => toggleFilter("cuotas", n)} />
        ))}

        {filters.precio && (
          <Chip label={filters.precio.label} onRemove={() => clear("precio", null)} />
        )}
      </div>
    </div>
  );
}
