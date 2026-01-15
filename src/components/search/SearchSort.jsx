export default function SearchSort({ sort, setSort, onClose }) {
  const options = [
    { value: "featured", label: "Destacados" },
    { value: "new", label: "Más recientes" },
    { value: "price_low", label: "Precio más bajo" },
    { value: "price_high", label: "Precio más alto" },
    { value: "discount", label: "Con descuento" },
    { value: "az", label: "A - Z" },
    { value: "za", label: "Z - A" }
  ];

  return (
    <>
      <div className="list-group">
        {options.map(opt => (
          <button
            key={opt.value}
            className={`list-group-item list-group-item-action ${
              sort === opt.value ? "active" : ""
            }`}
            onClick={() => setSort(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button className="btn btn-primary w-100 mt-4" onClick={onClose}>
        Aplicar
      </button>
    </>
  );
}
