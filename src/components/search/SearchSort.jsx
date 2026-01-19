import Dropdown from "react-bootstrap/Dropdown";

const getSortLabel = (value) => {
  switch (value) {
    case "featured": return "Destacados";
    case "new": return "Más recientes";
    case "price_low": return "Precio más bajo";
    case "price_high": return "Precio más alto";
    case "discount": return "Con descuento";
    case "az": return "A - Z";
    case "za": return "Z - A";
    default: return "Destacados";
  }
};

export default function SearchSort({ sort, setSort }) {
  return (
      <div className="d-flex align-items-center">
        <div className="pe-2">
          <span className="text-dark font-14">Ordenar por</span>
        </div>

        <Dropdown align="end">
          <Dropdown.Toggle className="p-0 bg-transparent border-0 no-focus text-dark font-14 font-bold">
            {getSortLabel(sort)}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSort("featured")}>Destacados</Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("new")}>Más recientes</Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("price_low")}>Precio más bajo</Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("price_high")}>Precio más alto</Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("discount")}>Con descuento</Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("az")}>A - Z</Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("za")}>Z - A</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
  );
}
