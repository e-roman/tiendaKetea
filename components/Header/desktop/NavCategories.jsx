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
                className="nav-link btn-drop"
                onClick={() => setMegaOpen(prev => !prev)}
              >
                ☰ Todas las categorías
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
                Descuentos
              </NavLink>
            </li>

            <li className="nav-item">
              <button
                className="nav-link bg-transparent border-0"
                onClick={() => setShowPriceModal(true)}
              >
                Lista de Precios
              </button>
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

            {/* PERFIL */}
            {isLogged && (
              <li className="nav-item ms-auto position-relative">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="nav-link btn-drop border-0">
                    <i className="bi bi-person-circle me-1"></i> Hola! Francisco Perez
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Link className="dropdown-item" to="/pages/Profile?view=personalInfo">
                      Datos personales
                    </Link>
                    <Link className="dropdown-item" to="/pages/Profile?view=favorites">
                      Favoritos
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
          </ul>

          {/* MEGA MENU */}
          {megaOpen && <MegaMenu />}
        </div>
      </div>
    </nav>
  );
}
