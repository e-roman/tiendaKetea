import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../src/context/AuthContext";
import { useCart } from "../../../src/hooks/useCart";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import Select from "react-select"; // <- Import react-select
import products from "../../../data/products.json"; // A

import { PROFILE_MENU } from "../../../src/config/profileMenu";


import TopAlert from "./TopAlert";
import Topbar from "./Topbar";
import LogoutModal from "../../Modals/LogoutModal";

const MOCK_LAST_SEARCHES = [
  "Robots",
  "Accesorios de exterior de piscina",
  "Climatización de Piscinas",
  "Filtros",
  "Bombas",
  "Revestimientos",
];
export default function HeaderMobile() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

const isSearchActive = searchOpen || query.length > 0;
const hasQuery = query.length > 0;
useEffect(() => {
  const closeProfile = () => setProfileOpen(false);

  if (profileOpen) {
    document.addEventListener("click", closeProfile);
  }

  return () => {
    document.removeEventListener("click", closeProfile);
  };
}, [profileOpen]);


  const { isLogged, logout } = useAuth();

  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

const handleSearchSubmit = () => {
  if (!query.trim()) return;

  navigate(`/buscar/${encodeURIComponent(query)}`);
  closeSearch();
};

const closeSearch = () => {
  setSearchOpen(false);
  setQuery("");
  setResults([]);
};
  const { cart } = useCart(); // ← FIX


  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

const handleInputChange = (e) => {
  const value = e.target.value;
  setQuery(value);

  if (!searchOpen) setSearchOpen(true);

  if (value.length < 2) {
    setResults([]);
    return;
  }

  runSearch(value);
};

const clearSearch = () => {
  setQuery("");
  setResults([]);
  setSearchOpen(true); // ← CLAVE
};


  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };


const runSearch = (value) => {
  const term = value.toLowerCase();

  const filtered = products
    .filter(item => {
      const inTitle = item.title.toLowerCase().includes(term);
      const inCategories = item.categories?.some(cat =>
        cat.toLowerCase().includes(term)
      );

      return inTitle || inCategories;
    })
    .slice(0, 6);

  setResults(filtered);
};

  return (
    <>
      {/* <TopAlert />
      <Topbar /> */}

          <header
            className={`header-mobile d-flex py-1 px-2 border-bottom ${
              isSearchActive ? "search-open" : ""
            }`}
          >

            {/* LOGO */}
            <Link to="/" className="navbar-brand header-actions">
              <img src="assets/img/favicon/favicon.png" alt="Ketea S.A" height="42" />
            </Link>



            {/* BUSCADOR */}
           <div className={`search-mobile ${isSearchActive ? "open" : ""}`}>
              <div className="position-relative w-100 box-search">

                {/* Flecha volver (solo cuando search está activo) */}
                {isSearchActive && (
                  <button
                    type="button"
                    className="btn btn-lg bg-transparent btn-back-search"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Volver"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                )}


                {/* Botón lupa (solo cuando NO está activo) */}
                {!isSearchActive && (
                  <button
                    type="button"
                    className="btn btn-lg bg-transparent btn-search-mobile"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Buscar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m21 21-4.34-4.34" />
                      <circle cx="11" cy="11" r="8" />
                    </svg>
                  </button>
                )}

                {/* Input */}
                <input
                  id="search"
                  type="text"
                  className="shadow-none input-search-mobile"
                  placeholder="Buscar…"
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => setSearchOpen(true)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                  autoComplete="off"
                />
                {isSearchActive && (
                  <div
                    className="search-dropdown search-dropdown-mb position-absolute w-100 p-3 bg-white shadow-sm"
                    style={{ zIndex: 999 }}
                  >
                    {/* 🔁 ÚLTIMAS BÚSQUEDAS (cuando NO hay texto) */}
                    {!hasQuery && (
                      <>

                        {MOCK_LAST_SEARCHES.map((term, index) => (
                          <button
                            key={index}
                            type="button"
                            className="d-flex align-items-center w-100 py-2 px-1 border-0 bg-transparent text-start"
                            onClick={() => {
                              setSearchOpen(true);
                              setQuery(term);
                              runSearch(term);
                            }}
                          >
                            <i className="bi bi-clock-history me-2  font-14 pe-2"></i>
                            <span className="font-14">{term}</span>
                          </button>


                        ))}
                      </>
                    )}

                    {/* RESULTADOS */}
                    {results.length > 0 && (
                      <>
                        {results.map((item) => (
                          <Link
                              key={item.id}
                              to={`/product/${slugify(item.title)}`}
                              className="d-flex align-items-start gap-3 py-2 px-1 border-bottom text-decoration-none text-dark"
                              onClick={closeSearch}
                            >
                            <img
                              src={item.image.replace("../", "/")}
                              alt={item.title}
                              width="55"
                              height="55"
                              className="rounded border"
                            />

                            <div>
                              <strong className="d-block">{item.title}</strong>
                              <span className="text-muted small">
                                ${item.price.toLocaleString("es-AR")}
                              </span>
                              <div className="small text-secondary">
                                {item.categories.slice(0, 2).join(" • ")}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </>
                    )}

                  </div>
                )}




                {/* Botón limpiar (solo cuando hay texto) */}
                {hasQuery && (
                  <button
                    type="button"
                    className="btn btn-link btn-close-search"
                    onClick={clearSearch}
                    aria-label="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
              </div>

            </div>



            <div className="header-actions">
              {/* Perfil */}
                <div className="nav-item ms-auto">
                  <div className="nav-header-menu">
                      <button
                        type="button"
                        className={`nav-header-menu-switch nav-button-mb ${profileOpen ? "open" : ""}`}
                        aria-label="Menú de usuario"
                        aria-expanded={profileOpen}
                        onClick={(e) => {
                          e.stopPropagation();
                          setProfileOpen(prev => !prev);
                        }}
                      >
                        <span />
                        <span />
                        <span />
                        <span />
                      </button>

                  </div>

                  <div id="nav-header-menu-mobile" className={`navProfile-xs border-bottom ${profileOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>

                    {/*LOGING*/}
                    {isLogged && (
                    <Link className="menu-user-info bg-primary py-3 d-flex" to="/pages/Profile?view=personalInfo" onClick={() => setProfileOpen(false)}>
                      <div className="photo-profile-xs"></div>
                      <div className="ps-2">
                        <h3 className="text-white mb-0">Francisco Perez</h3>
                        <p className="text-white small mb-0">Mi Perfil</p>
                      </div> 
                    </Link>
                    )}
                    
                    {/*NO LOGING*/}
                    {!isLogged && (
                    <Link className="menu-user-info bg-primary py-3 d-flex" type="button" data-bs-toggle="modal" data-bs-target="#signupModal">
                      <div className="photo-profile-xs"></div>
                      <div className="ps-2">
                        <h3 className="text-white mb-0">Bienvenido</h3>
                        <p className="text-white small mb-0">Ingresa a tu cuenta para realizar compras</p>
                      </div> 
                    </Link>
                     )}

                    {isLogged && (
                      <>
                      <div>
                        {PROFILE_MENU.map(section => (
                          <div key={section.title}>
                            {section.items.map(item => (
                              <Link
                                key={item.key}
                                className="dropdown-item"
                                to={`/pages/Profile?view=${item.key}`}
                                onClick={() => setProfileOpen(false)}
                              >
                                <i className={`bi ${item.icon} me-2`} />
                                {item.label}
                              </Link>
                            ))}

                            
                          </div>
                        ))}
                        <hr />
                        </div>
                      </>
                    )}

                    
                    <div>
                      <Link className="dropdown-item" to="/" onClick={() => setProfileOpen(false)}>
                        <i className="bi bi-heart me-2"></i> Incio
                      </Link>

                      <Link className="dropdown-item" to="/Novedades" onClick={() => setProfileOpen(false)}>
                        <i className="bi bi-heart me-2"></i> Novedades
                      </Link>
                      <Link className="dropdown-item" to="/Descuentos" onClick={() => setProfileOpen(false)}>
                        <i className="bi bi-bag-check me-2"></i> Descuentos
                      </Link>
                      <Link className="dropdown-item" to="/pages/Contacto" onClick={() => setProfileOpen(false)}>
                        <i className="bi bi-receipt me-2"></i> Sucursales
                      </Link>
                      <Link className="dropdown-item" to="/pages/Sucursales" onClick={() => setProfileOpen(false)}>
                        <i className="bi bi-geo-alt me-2"></i> Contacto
                      </Link>
                    </div>
                    <hr/>

                    <div className="px-3">
                    <button
                      className="dropdown-item"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      Cerrar sesión
                    </button>
                    </div>

                  </div>

                </div>
            </div>


            {/* Carrito */}
             <div className="header-actions">
                <button
                  className="btn position-relative nav-cart"
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

      </header>


    </>
  );
}
