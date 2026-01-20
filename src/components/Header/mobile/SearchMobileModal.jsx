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
          <h6 className="mb-2">Últimas búsquedas</h6>
          <div className="d-flex flex-wrap gap-2">
            {recentSearches.map((item, idx) => (
              <button
                key={idx}
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleSearchSubmit(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resultados */}
      {results.length > 0 && (
        <>
          <h6 className="mb-2">Productos</h6>
          <div className="d-flex flex-column gap-2">
            {results.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="d-flex gap-2 align-items-center p-2 border rounded"
                onClick={onClose}
              >
                <img src={p.image.replace("../", "/")} alt={p.title} width="48" />
                <div>
                  <div>{p.title}</div>
                  <div className="text-dark small">${p.price.toLocaleString("es-AR")}</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
