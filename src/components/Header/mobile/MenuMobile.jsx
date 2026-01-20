import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PROFILE_MENU } from "@/config/profileMenu";
import CategoriesModal from "./CategoriesModal";

export default function MenuMobile({ closeAll }) {
  const { isLogged, logout } = useAuth();
  const [showCategories, setShowCategories] = useState(false);

  const handleLogout = () => logout();

  const handleCloseAll = () => {
    setShowCategories(false); // reinicia categoría activa
    closeAll(); // cierra todos los offcanvas
  };

  return (
    <div className="nav-menu-mobile border-bottom p-2">

        {/* LOGIN / Bienvenida */}
        {isLogged ? (
          <Link
            className="menu-user-info bg-primary py-3 px-2 d-flex align-items-center rounded mb-2 w-100"
            to="/pages/Profile"
            onClick={handleCloseAll} // cerrar al navegar
          >
            <div className="photo-profile-xs me-2"></div>
            <div>
              <h3 className="text-white mb-0">Francisco Perez</h3>
              <p className="text-white small mb-0">Mi Perfil</p>
            </div>
          </Link>
        ) : (
          <button
            type="button"
            className="menu-user-info bg-primary py-3 px-2 d-flex align-items-center rounded mb-2 border-0"
            data-bs-toggle="modal"
            data-bs-target="#signupModal"
          >
            <div className="photo-profile-xs me-2"></div>
            <div>
              <h3 className="text-white mb-0">Bienvenido</h3>
              <p className="text-white small mb-0">Ingresa a tu cuenta para realizar compras</p>
            </div>
          </button>
        )}

        {/* MENÚ PRINCIPAL */}
        <div className="menu-items mt-2">
          <button
            className="dropdown-item"
            onClick={() => setShowCategories(true)}
          >
            <i className="bi bi-list-ul me-2"></i> Categorías
          </button>

          <Link className="dropdown-item" to="/" onClick={handleCloseAll}>
            <i className="bi bi-house me-2"></i> Home
          </Link>

          <Link className="dropdown-item" to="/Novedades" onClick={handleCloseAll}>
            <i className="bi bi-star me-2"></i> Novedades
          </Link>

          <Link className="dropdown-item" to="/Descuentos" onClick={handleCloseAll}>
            <i className="bi bi-tags me-2"></i> Descuentos
          </Link>

          <Link className="dropdown-item" to="/pages/Mas-vendido" onClick={handleCloseAll}>
            <i className="bi bi-fire me-2"></i> Más vendido
          </Link>

          <Link className="dropdown-item" to="/pages/Sucursales" onClick={handleCloseAll}>
            <i className="bi bi-envelope me-2"></i> Contacto
          </Link>
        </div>


      {/* PERFIL LINKS */}
      {/* {isLogged &&
        PROFILE_MENU.map(section => (
          <div key={section.title} className="mb-2">
            {section.items.map(item => (
              <Link
                key={item.key}
                to={`/pages/Profile?view=${item.key}`}
                className="dropdown-item"
              >
                <i className={`bi ${item.icon} me-2`} />
                {item.label}
              </Link>
            ))}
          </div>
        ))} */}


      {/* LOGOUT */}
      {isLogged && (
        <>
          <hr />
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
          </button>
        </>
      )}

      {/* Categories Offcanvas */}
      <CategoriesModal
        show={showCategories}
        onBack={() => setShowCategories(false)}
        onClose={handleCloseAll}
      />
    </div>
  );
}
