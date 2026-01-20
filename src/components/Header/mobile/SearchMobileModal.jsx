import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "@/data/products.json";

export default function SearchMobileModal({ show, onClose }) {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showRecent, setShowRecent] = useState(true);

  const recentSearches = [
    "Robot",
    "Filtros",
    "Bombas",
    "Accesorios de exterior de piscina",
    "Climatización de Piscinas"
  ];


const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-primary">{part}</span>
    ) : part
  );
};


  useEffect(() => {
    if (show) {
      setQuery("");
      setResults([]);
      setShowRecent(true);
    }
  }, [show]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowRecent(false);

    if (value.length < 2) {
      setResults([]);
      setShowRecent(true);
      return;
    }

    const filtered = products
      .filter((p) => p.title.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);
    setResults(filtered);
  };

  const handleSearchSubmit = (value = query) => {
    if (!value.trim()) return;
    navigate(`/buscar/${encodeURIComponent(value)}`);
    onClose();
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowRecent(true);
  };

  // Cierra si clic afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="search-mobile-modal fixed-top w-100 h-100 bg-white p-3" style={{ zIndex: 1050, overflowY: 'auto' }}>
      {/* Header */}
      <div className="d-flex align-items-center mb-3 position-relative">
        {/* Flecha para cerrar */}
        <button className="btn me-2" onClick={onClose}>
          <i className="bi bi-arrow-left"></i> {/* Cambié de X a flecha */}
        </button>

        {/* Contenedor del input para poder poner el X dentro */}
        <div className="position-relative w-100">
          <input
            type="text"
            className="form-control pe-4" // padding a la derecha para el X
            placeholder="Buscar productos, marcas y más…"
            value={query}
            autoFocus
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          />
          {/* Botón X para limpiar input */}
          {query && (
            <button
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y btn btn-sm btn-outline-secondary"
              style={{ padding: "0 6px", lineHeight: 1 }}
              onClick={clearSearch}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
      </div>


      {/* Últimas búsquedas */}
      {showRecent && results.length === 0 && (
        <div className="mb-3">
          {/* <h6 className="mb-2">Últimas búsquedas</h6> */}
            {recentSearches.map((item, idx) => (
              <button
                key={idx}
                className="w-100 text-start d-flex align-items-center gap-3 px-2 py-2 border-0 bg-white result-link mb-1"
                onClick={() => handleSearchSubmit(item)}
              >
                <i className="bi bi-clock-history text-muted"></i>
                 <span>{item}</span>
              </button>
            ))}
        </div>
      )}

      {/* RESULTADOS */}
      {results.length > 0 && (
        <>
          <div className="px-2 pt-3 pb-1">
            <h6 className="font-bold mb-0">Productos</h6>
          </div>

          {results.map(item => (
            <Link
              key={item.id}
              to={`/product/${item.slug}`}
              className="result-link"
              onClick={() => {
                onClose();
                setQuery("");
                setResults([]);
              }}
            >
              <div className="picture">
                <img
                  src={item.image.replace("../", "/")}
                  alt={item.title}
                  width="48"
                />
              </div>

              <div className="col_right_result">
                <div className="font-16">
                  {highlightMatch(item.title, query)}
                </div>

                <div className="d-flex gap-2 text-dark small font-medium pricing-meta my-1">
                  ${item.price.toLocaleString("es-AR")}

                  {item.oldPrice != null && (
                    <div className="old-price text-muted">
                      ${item.oldPrice.toLocaleString("es-AR")}
                    </div>
                  )}

                  {item.discount && (
                    <div className="badge font-12 font-medium py-1 px-2 badge-yellow">
                      -{item.discount}% OFF
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </>
      )}


    </div>
  );
}
