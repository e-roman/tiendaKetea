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
      <div className="border-bottom pb-4 mb-4">
        <h5 className="pb-2">Marca</h5>
        {marcas.map(m => {
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
        })}

      </div>

      {/* ACCIONAMIENTO */}
      <div className="border-bottom pb-4 mb-4">
        <h5 className="pb-2">Accionamiento</h5>
          {accionamientos.map(a => {
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
          })}

      </div>

      {/* DESCUENTOS */}
      <div className="border-bottom pb-4 mb-4">
        <h5 className="pb-2">Descuentos</h5>
          {descuentos.map(d => {
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
          })}

      </div>

      {/* CATEGORÍAS */}
      <div className="border-bottom pb-4 mb-4">
        <h5 className="pb-2">Categorías</h5>
          {categorias.map(c => {
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
          })}
      </div>


      {/* PRECIO */}
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


      <button className="btn btn-sm btn-border border-primary text-primary w-100 d-none d-lg-block" onClick={resetFilters}>
        Limpiar filtros
      </button>
    </div>



  );
}
