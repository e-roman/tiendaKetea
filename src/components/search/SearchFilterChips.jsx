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

      <div className="d-flex flex-wrap row-gap-2 mb-2">

        {/* MARCAS */}
        {filters.marcas.map(m => (
          <button
            key={`marca-${m}`}
            className="chip"
            onClick={() => toggleFilter("marcas", m)}
          >
            {m}
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}

        {/* CATEGORÍAS */}
        {filters.categorias.map(c => (
          <button
            key={`cat-${c}`}
            className="chip"
            onClick={() => toggleFilter("categorias", c)}
          >
            {c}
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}

        {/* ACCIONAMIENTO */}
        {filters.accionamiento.map(a => (
          <button
            key={`acc-${a}`}
            className="chip"
            onClick={() => toggleFilter("accionamiento", a)}
          >
            {a}
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}

        {/* DESCUENTOS */}
        {filters.descuentos.map(d => (
          <button
            key={`desc-${d}`}
            className="chip"
            onClick={() => toggleFilter("descuentos", d)}
          >
            {d}% OFF
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}

        {/* CANTIDAD DE CUOTAS */}
        {filters.cuotasCantidad.map(cuota => (
          <button
            key={`cuota-${cuota}`}
            className="chip"
            onClick={() => toggleFilter("cuotasCantidad", cuota)}
          >
            {cuota}
            <span className="icon-inline chip-remove-icon chip-close" />
          </button>
        ))}

      </div>
    </div>
  );
}
