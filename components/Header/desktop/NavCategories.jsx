import MegaMenu from "./MegaMenu";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useAuth } from "../../../src/context/AuthContext";

export default function NavCategories({
  setShowPriceModal,
  setShowLogoutModal,
  megaOpen,
  setMegaOpen
}) {
  const { isLogged } = useAuth();

  return (
    <nav className="navbar-nav-wrap border-bottom">
      <div className="container position-relative">

        {/* CONTENEDOR MAESTRO */}
        <div
          className="mega-trigger-area"
          onMouseLeave={() => setMegaOpen(false)}
        >
          <ul className="navbar-bottom d-flex align-items-center">

            {/* BOTÓN */}
            <li className="nav-item position-static">
              <button
                className="nav-link btn-drop ps-1"
                onClick={() => setMegaOpen(prev => !prev)}
              >
                <i className="bi bi-list"></i>
                Todas las categorías
                <i className="bi bi-chevron-down"></i>

              </button>
            </li>

            {/* LINKS */}
            <li className="nav-item">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/Novedades" className="nav-link">
                Novedades
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/Descuentos" className="nav-link">
                Ofertas de la semana
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/Mas-vendido" className="nav-link">
                Más vendido
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink to="/Sucursales" className="nav-link">
                Sucursales
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/Contacto" className="nav-link">
                Contacto
              </NavLink>
            </li>


            {/* Perfil */} 
            {isLogged && (
            <li className="nav-item ms-auto position-relative">
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle className="nav-link btn-drop d-flex align-items-center border-0"> <i className="bi bi-person-circle me-1"></i> Hola!  <span className="font-bold ps-1">Francisco Perez</span> </Dropdown.Toggle>
                    <Dropdown.Menu align="end" style={{ minWidth: "14rem" }}>
                        <Link className="dropdown-item" to="/pages/Profile?view=personalInfo"> <i className="bi bi-person-circle me-2"></i>Mis Datos </Link>
                        <Link className="dropdown-item" to="/pages/Profile?view=favorites"> <i className="bi bi-heart me-2"></i> Favoritos </Link>
                        <Link className="dropdown-item" to="/pages/Profile?view=orders"> <i className="bi bi-bag-check me-2"></i> Pedidos </Link>
                        <Link className="dropdown-item" to="/pages/Profile?view=payments"> <i className="bi bi-receipt me-2"></i> Comprobantes </Link>
                        <Link className="dropdown-item" to="/pages/Profile?view=address"> <i className="bi bi-geo-alt me-2"></i> Direcciones </Link>
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
              <li className="ms-auto position-relative d-flex gap-1"> 
                <button className="btn btn-primary btn-drop btn-sm p-0" type="button" 
                data-bs-toggle="modal" 
                data-bs-target="#signupModal"
                 onClick={() => window.dispatchEvent(new CustomEvent("authStep", { detail: "login" }))}
                > 
                  Mi Cuenta
                </button> 
                <span>/</span> 
                <button
                  className="btn btn-primary btn-drop btn-sm p-0"
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                  onClick={() => window.dispatchEvent(new CustomEvent("authStep", { detail: "signup" }))}
                >
                  Registrarme
                </button>
              </li> 
            )}



          </ul>

          {/* MEGA MENU */}
          {megaOpen && <MegaMenu />}
        </div>
      </div>
    </nav>
  );
}
