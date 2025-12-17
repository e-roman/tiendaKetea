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


export default function HeaderMobile() {
const [profileOpen, setProfileOpen] = useState(false);

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
    clearSearch();
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);



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

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const filtered = products
      .filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 6);

    setResults(filtered);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };



  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <TopAlert />
      <Topbar />

      <header className="header-mobile d-flex p-2">
          {/* LOGO */}
          <Link to="/" className="navbar-brand">
            <img src="../assets/img/favicon/favicon.png" alt="Ketea S.A" height="50" />
          </Link>



          {/* BUSCADOR */}
          <div className="d-block" style={{width: "70%"}}>
              <div className="d-flex position-relative">
                <div className="position-relative w-100">
                      <input 
                          id="search"
                          type="text"
                          className="form-control form-control-md shadow-none input-search-mobile"
                          placeholder="Buscar…"
                          value={query}
                          onChange={handleInputChange}
                          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                          autoComplete="off"
                          />

                  <button
                    type="button"
                    className="btn btn-lg bg-light btn-search-mobile"
                    onClick={handleSearchSubmit}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search">
                      <path d="m21 21-4.34-4.34"/>
                      <circle cx="11" cy="11" r="8"/>
                  </svg>
                  </button>

                </div>
              </div>
          </div>

          <div className="d-flex">

            <div>
              {/* Perfil */}
              
                <div className="nav-item ms-auto">
                  <div>
                      <button
                        className="btn btn-light position-relative btn-icon rounded-circle btn-icon-top"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProfileOpen(prev => !prev);
                        }}
                        aria-expanded={profileOpen}
                      >
                        <i className="bi bi-person-circle me-1"></i>
                      </button>
                  </div>

                  <div className={`navProfile-xs border-bottom ${profileOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>

                    {/*LOGING*/}
                    {isLogged && (
                    <Link className="menu-user-info bg-primary py-3 d-flex" to="/pages/Profile?view=personalInfo" onClick={() => setProfileOpen(false)}>
                      <div className="photo-profile-xs"></div>
                      <div className="ps-2">
                        <h4 className="text-white mb-0">Francisco Perez</h4>
                        <p className="text-white small mb-0">Mi Perfil</p>
                      </div> 
                    </Link>
                    )}
                    
                    {/*NO LOGING*/}
                    {!isLogged && (
                    <Link className="menu-user-info bg-primary py-3 d-flex" type="button" data-bs-toggle="modal" data-bs-target="#signupModal">
                      <div className="photo-profile-xs"></div>
                      <div className="ps-2">
                        <h4 className="text-white mb-0">Bienvenido</h4>
                        <p className="text-white small mb-0">Ingresa a tu cuenta para realizar compras</p>
                      </div> 
                    </Link>
                     )}

                    {isLogged && (
                      <>
                      <div className="pt-2">
                        {PROFILE_MENU.map(section => (
                          <div className="px-3" key={section.title}>
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

                    
                    <div className="px-3">
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
            <div>
                <button
                  className="btn btn-light position-relative btn-icon rounded-circle btn-icon-top"
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

      </header>


        {/* <button className="burger" onClick={() => setOpen(true)}>
          <i className="bi bi-list"></i>
        </button>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="close" onClick={() => setOpen(false)}>
          <i className="bi bi-x"></i>
        </button>

        <nav>
          <button onClick={() => goTo("/novedades")}>Novedades</button>
          <button onClick={() => goTo("/descuentos")}>Descuentos</button>
          <button onClick={() => goTo("/buscar")}>Buscar</button>
        </nav>
      </div> */}

      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />


    </>
  );
}
