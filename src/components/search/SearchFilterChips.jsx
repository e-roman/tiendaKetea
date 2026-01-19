export default function SearchFilterChips({
  filters,
  toggleFilter,
  resetFilters
}) {
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

      <div className="d-flex flex-wrap mb-2">
        {filters.marcas.map(m => (
          <button
            key={m}
            className="chip mb-2"
            onClick={() => toggleFilter("marcas", m)}
          >
            {m}
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}

        {filters.categorias.map(c => (
          <button
            key={c}
            className="chip"
            onClick={() => toggleFilter("categorias", c)}
          >
            {c}
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}

        {filters.accionamiento.map(a => (
          <button
            key={a}
            className="chip"
            onClick={() => toggleFilter("accionamiento", a)}
          >
            {a}
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}

        {filters.descuentos.map(d => (
          <button
            key={d}
            className="chip"
            onClick={() => toggleFilter("descuentos", d)}
          >
            {d}% OFF
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}
      </div>
    </div>
  );
}
