// src/components/header/NavCategories.jsx
import { Link } from "react-router-dom";
import { Dropdown, ButtonGroup } from "react-bootstrap";

import { useAuth } from "../../src/context/AuthContext";


export default function NavCategories({ setShowPriceModal, setShowLogoutModal }) {
  const { isLogged, logout } = useAuth();
  return (
    <nav className="navbar-nav-wrap align-items-start border-bottom">
      
      <div className="container">
        <ul className="navbar-bottom d-flex align-items-center">

          {/* Categorías Mega Menu */}
          <li className="nav-item position-relative">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                id="pagesMegaMenu"
                className="nav-link btn-drop ps-md-0 border-0"
              >
                Categorías
              </Dropdown.Toggle>

              <Dropdown.Menu className="MenuCategorias" style={{ minWidth: "54rem" }}>
                <div className="navbar-dropdown-menu-inner">
                  <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Productos Químicos</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Robots Dolphin</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Accesorios Natación</Link>
                    </div>
                    <div className="col-sm">
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Inflables y juegos</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Accesorios de limpieza</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Accesorios Vaso Piscina</Link>
                    </div>
                    <div className="col-sm">
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Accesorios de Spa</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Accesorios de exterior de piscina</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Bombas</Link>
                    </div>
                    <div className="col-sm">
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Borders Atérmicos</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Climatización de Piscinas</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Gabinetes</Link>
                    </div>
                    <div className="col-sm">
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Conducción de Fluidos</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Cuidado del agua</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Filtros</Link>
                    </div>
                    <div className="col-sm">
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Iluminación</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Revestimientos</Link>
                      <Link className="dropdown-item" to="/pages/ProductsGrid">Riego</Link>
                    </div>
                  </div>
                </div>

                {/* Mega Menu Banner */}
                <div className="navbar-dropdown-menu-shop-banner mt-2">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <img className="navbar-dropdown-menu-shop-banner-img" src="../assets/img/mockups/img4.png" alt="Image Description" />
                    </div>
                    <div className="flex-grow-1 p-4">
                      <span className="h4 d-block text-primary">Win T-Shirt</span>
                      <p>Win one of our Front brand T-shirts.</p>
                      <Link className="btn btn-sm btn-soft-primary btn-transition" to="../index.html">
                        Learn more <i className="bi-chevron-right small"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          {/* Links simples */}
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pages/Novedades">Novedades</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pages/Descuentos">Descuentos</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link bg-transparent border-0" onClick={() => setShowPriceModal(true)}>
              Lista de Precios
            </button>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pages/Sucursales">Sucursales</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pages/Contacto">Contacto</Link>
          </li>

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
            <li className="ms-auto position-relative">
              <button
                className="btn btn-primary btn-drop btn-sm p-0"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#signupModal"
              >
                <i className="bi bi-person-circle me-1"></i> Ingresar
              </button>
            </li>
          )}


        </ul>
      </div>
    </nav>
  );
}
