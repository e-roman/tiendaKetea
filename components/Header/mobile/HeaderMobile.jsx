import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../src/context/AuthContext";
import { useCart } from "../../../src/hooks/useCart";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import Select from "react-select"; // <- Import react-select
import products from "../../../data/products.json"; // A


import TopAlert from "./TopAlert";
import Topbar from "./Topbar";
import LogoutModal from "../../Modals/LogoutModal";


export default function HeaderMobile() {
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
                          placeholder="Buscar productos, marcas y más…"
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
              {isLogged && (
                <li className="nav-item ms-auto position-relative">
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle className="nav-link btn-drop d-flex align-items-center border-0">
                      <i className="bi bi-person-circle me-1"></i> Hola! Francisco Perez
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end" style={{ minWidth: "14rem" }}>
                      <Link className="dropdown-item" to="/pages/Profile?view=personalInfo">
                        <i className="bi bi-person-circle me-2"></i> Datos personales
                      </Link>
                      <Link className="dropdown-item" to="/pages/Profile?view=favorites">
                        <i className="bi bi-heart me-2"></i> Favoritos
                      </Link>
                      <Link className="dropdown-item" to="/pages/Profile?view=orders">
                        <i className="bi bi-bag-check me-2"></i> Pedidos
                      </Link>
                      <Link className="dropdown-item" to="/pages/Profile?view=payments">
                        <i className="bi bi-receipt me-2"></i> Comprobantes
                      </Link>
                      <Link className="dropdown-item" to="/pages/Profile?view=address">
                        <i className="bi bi-geo-alt me-2"></i> Direcciones
                      </Link>

                      <Dropdown.Divider />

                      <button
                        className="dropdown-item"
                        onClick={() => setShowLogoutModal(true)}
                      >
                        Cerrar sesión
                      </button>

                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              )}
                
              {/* Login */}
              {!isLogged && (
                <div className="position-relative">
                  <button
                    className="btn btn-primary btn-drop btn-sm p-0"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                  </button>
                </div>
              )}
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
