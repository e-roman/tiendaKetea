import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PROFILE_MENU } from "@/config/profileMenu";
import CategoriesModal from "./CategoriesModal";
import { megaMenuData } from "@/data/megaMenuData";


export default function MenuMobile({ closeAll }) {
  const { isLogged, logout } = useAuth();
const [showCategories, setShowCategories] = useState(false);
const [activeCategory, setActiveCategory] = useState(null);

  const handleLogout = () => logout();

  const handleCloseAll = () => {
    setShowCategories(false); // reinicia categoría activa
    closeAll(); // cierra todos los offcanvas
  };

const categories = megaMenuData.filter(
  cat => cat.id !== "oferta-semana" && cat.id !== "novedades"
);
  return (
    <div className="nav-menu-mobile border-bottom pb-4">

        {/* LOGIN / Bienvenida */}
        {isLogged ? (
          <Link
            className="menu-user-info bg-primary py-3 px-3 d-flex align-items-center text-left mb-2 w-100"
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
          <Link
            className="menu-user-info bg-primary py-3 px-3 d-flex align-items-center text-left mb-2 border-0 w-100"
            data-bs-toggle="modal"
            data-bs-target="#signupModal"
          >
            <div className="photo-profile-xs me-2"></div>
            <div>
              <h3 className="text-white mb-0">Bienvenido</h3>
              <p className="text-white small mb-0">Ingresa a tu cuenta para realizar compras</p>
            </div>
          </Link>
        )}

        {/* MENÚ PRINCIPAL */}
        <div className="menu-items mt-2">
          {/* CATEGORÍAS */}
          <div className="menu-categories mt-3">
            <h6 className="px-3 mb-3 small fw-bold text-black">
              Categorías
            </h6>

            {categories.map(cat => (
              <button
                key={cat.id}
                className="dropdown-item py-2 d-flex justify-content-between align-items-center"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowCategories(true);
                }}
              >
                {cat.label}
                <span><i className="bi bi-chevron-right"/></span>
              </button>
            ))}
          </div>




        </div>



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
        categoryId={activeCategory}
        onBack={() => setShowCategories(false)}
        onClose={handleCloseAll}
      />
    </div>
  );
}
