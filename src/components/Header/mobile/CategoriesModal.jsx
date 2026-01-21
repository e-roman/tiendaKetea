import { Link } from "react-router-dom";
import { megaMenuData } from "@/data/megaMenuData";

export default function CategoriesModal({ show, categoryId, onBack, onClose }) {
  if (!show || !categoryId) return null;

  // Excluimos categorías especiales
  const categories = megaMenuData.filter(
    cat => cat.id !== "oferta-semana" && cat.id !== "novedades"
  );

  const category = categories.find(c => c.id === categoryId);

  if (!category) return null;

  return (
    <>
      <div className="offcanvas-backdrop fade show"></div>

      <div
        className="offcanvas offcanvas-start w-100 show"
        style={{ visibility: "visible"}}
      >
        <div className="offcanvas-header py-3 mb-3 d-flex justify-content-between align-items-center">
          {/* Volver al menú principal */}
          <button className="btn btn-link text-dark p-0" onClick={onBack}>
            <i className="bi bi-arrow-left font-20 me-3"/>
          </button>

          <h5 className="offcanvas-title">{category.label}</h5>

          {/* Cierra todo */}
          <button
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        <div className="offcanvas-body py-2 px-3">
          {category.sections.map(section => (
            <div key={section.title} className="mb-3">
              <strong className="d-block mb-1">{section.title}</strong>

              {section.items.map(item => (
                <Link
                  key={item}
                  to={`/buscar/${encodeURIComponent(item)}`}
                  className="dropdown-item"
                  onClick={onClose}
                >
                  {item}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
