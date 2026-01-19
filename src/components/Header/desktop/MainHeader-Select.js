import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import Select from "react-select";

import { useCart } from "@/hooks/useCart";
import products from "@/data/products.json";
import { megaMenuData } from "./megaMenuData";

export default function MainHeader() {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { cart } = useCart();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showRecent, setShowRecent] = useState(false); 

  const [category, setCategory] = useState("");
  const selectRef = useRef(null);
  const [selectWidth, setSelectWidth] = useState(null);
  useEffect(() => {
    if (!category) {
      const defaultSpan = document.createElement("span");
      defaultSpan.style.visibility = "hidden";
      defaultSpan.style.position = "absolute";
      defaultSpan.style.fontSize = "1rem";
      defaultSpan.style.fontFamily = "inherit";
      defaultSpan.style.whiteSpace = "nowrap";
      defaultSpan.textContent = "Categoría";
      document.body.appendChild(defaultSpan);
      setSelectWidth(defaultSpan.offsetWidth + 36);
      defaultSpan.remove();
      return;
    }

    const option = megaMenuData.find(c => c.id === category);
    if (!option) return;

    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.fontSize = "1rem";
    span.style.fontFamily = "inherit";
    span.style.whiteSpace = "nowrap";
    span.textContent = option.label;
    document.body.appendChild(span);

    setSelectWidth(span.offsetWidth + 36); // padding + caret
    span.remove();
  }, [category]);

  // últimas búsquedas
  const recentSearches = [
    { id: 1, label: "Robot" },
    { id: 2, label: "Filtros" },
    { id: 3, label: "Bombas" },
    { id: 4, label: "Accesorios de exterior de piscina" },
    { id: 5, label: "Climatización de Piscinas" },
  ];

  const handleSearchSubmit = (value = query) => {
    if (!value.trim()) return;
    navigate(`/buscar/${encodeURIComponent(value)}`);
    clearSearch();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowRecent(false);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const filtered = products
      .filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 6);

    setResults(filtered);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowRecent(false);
  };

  // Opciones para el select
  const categoryOptions = [
    { value: "", label: "Categoría" },
  ...megaMenuData
    .filter(c => !c.highlight)
    .map(cat => ({ value: cat.id, label: cat.label }))
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
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        clearSearch();
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") clearSearch();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, []);


  const selectedCategory =
  categoryOptions.find(opt => opt.value === category) || categoryOptions[0];

  return (
    <header className="py-3 border-bottom">
      <div className="container d-flex align-items-center justify-content-between">

        {/* LOGO */}
        <Link to="/" className="navbar-brand">
          <img src="../assets/img/logo/logo-ketea.svg" alt="Ketea S.A" height="42" />
        </Link>


        {/* BUSCADOR */}
        <div className="search-content-field d-flex align-items-stretch px-6 w-100">

          {/* SELECT CATEGORÍA */}
          <div className="search-select">
            <Select
              value={selectedCategory}
              options={categoryOptions}
              isSearchable={false}
              onChange={(opt) => setCategory(opt.value)}
              classNamePrefix="custom-select"
              styles={{
                container: (base) => ({
                  ...base,
                  width: "fit-content",
                }),

                control: (base) => ({
                  ...base,
                  minHeight: 44,
                  backgroundColor: "#f4f4f4",
                  border: "1px solid #f4f4f4",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  boxShadow: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }),

                valueContainer: (base) => ({
                  ...base,
                  padding: "0 12px",
                  whiteSpace: "nowrap",
                }),

                singleValue: (base) => ({
                  ...base,
                  whiteSpace: "nowrap",
                }),

                indicatorsContainer: (base) => ({
                  ...base,
                  paddingRight: 8,
                }),

                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          {/* INPUT BUSCADOR */}
          <div
            ref={searchRef}
            className="position-relative flex-grow-1"
          >
            <input
              type="text"
              className="form-control form-control-lg input-search"
              placeholder="Buscar productos, marcas y más…"
              value={query}
              autoComplete="off"
              onFocus={() => {
                if (!query) setShowRecent(true);
              }}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            />

            <button
              type="button"
              className="btn btn-lg btn-search"
              onClick={() => handleSearchSubmit()}
            >
              <i className="bi bi-search" />
            </button>

            {/* ===================== */}
            {/* DROPDOWN RESULTADOS */}
            {/* ===================== */}
            {(results.length > 0 || showRecent) && (
              <div
                className="search-dropdown position-absolute w-100 mt-2 bg-white rounded"
                style={{ zIndex: 999 }}
              >

                {/* ÚLTIMAS BÚSQUEDAS */}
                {showRecent && (
                  <>
                    <div className="px-2 pt-3 pb-2">
                      <h6 className="font-bold mb-2">Últimas búsquedas</h6>
                    </div>

                    {recentSearches.map(item => (
                      <button
                        key={item.id}
                        className="w-100 text-start d-flex align-items-center gap-3 px-2 py-2 border-0 bg-white result-link mb-1"
                        onClick={() => handleSearchSubmit(item.label)}
                      >
                        <i className="bi bi-clock-history text-muted"></i>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </>
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
                        onClick={clearSearch}
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
            )}
          </div>
        </div>


        {/* ICONOS */}
        <div className="d-flex align-items-center gap-1">

        {/* FAVORITOS */}
        <Link className="btn position-relative btn-icon-top" to="/pages/Profile?view=favorites"><i className="bi bi-heart"></i></Link>


          {/* NOTIFICACIONES */}
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle className="btn btn-light position-relative rounded-circle btn-icon btn-icon-top btn-notifications">
                  <span className="notifications-active"> </span>
              <i className="bi bi-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="dropdowNotifications p-0" style={{ minWidth: "25rem" }}>
              <div className="card">
                <div className="card-header card-header-content-between pt-4 pb-3 ps-4">
                    <h5 className="card-title font-bold text-dark mb-0">Notificaciones</h5>
                  </div>
                
                <div className="card-body-height">
                  <div className="list-group notifications">
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pt-2 pb-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-cart3"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Nuevo pedido confirmado</h6>
                                  <p className="mb-0 opacity-50">Tu compra fue procesada correctamente.</p>
                              </div>
                              <small className="opacity-50 text-nowrap">1min</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 py-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Tu paquete está en camino</h6>
                                  <p className="mb-0 opacity-50">El pedido #48291 fue despachado y está viajando hacia tu domicilio. </p>
                              </div>
                              <small className="opacity-50 text-nowrap">3d</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pb-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-cart3"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Nuevo pedido confirmado</h6>
                                  <p className="mb-0 opacity-50">Tu compra fue procesada correctamente.</p>
                              </div>
                              <small className="opacity-50 text-nowrap">1min</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 py-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Tu paquete está en camino</h6>
                                  <p className="mb-0 opacity-50">El pedido #48291 fue despachado y está viajando hacia tu domicilio. </p>
                              </div>
                              <small className="opacity-50 text-nowrap">3d</small>
                          </div>
                      </Link>

                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pt-3 border-0" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Pago rechazado</h6>
                                  <p className="mb-0 opacity-50">Hubo un problema al procesar tu método de pago. </p>
                              </div>
                              <small className="opacity-50 text-nowrap">15d</small>
                          </div>
                      </Link>
                      
                  </div>
                </div>

                <Link className="card-footer text-center py-3 border-top" to="/pages/Profile?view=notificaciones">
                    <p className="small mb-0 text-dark py-1">Ver todas las notificaciones </p>
                </Link>

              </div>
            </Dropdown.Menu>
          </Dropdown>


          {/* Carrito */}
          <div className="dropdown">
              <button
                className="btn position-relative btn-icon-top"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartOffcanvas"
              >
                <i className="bi bi-cart3"></i>
                {cart.length > 0 && ( 
                  <span className="quantity-add">
                    {cart.length}
                  </span>
                )}
              </button>
          </div>

        </div>

        
      </div>
    </header>
  );
}
