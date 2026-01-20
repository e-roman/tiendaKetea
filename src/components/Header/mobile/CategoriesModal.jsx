import { useState } from "react";
import { Link } from "react-router-dom";
import { megaMenuData } from "@/data/megaMenuData";

export default function CategoriesModal({ show, onBack, onClose }) {
  const [activeCategory, setActiveCategory] = useState(null);

  if (!show) return null;

  // Excluimos las dos primeras categorías
  const categories = megaMenuData.filter(
    cat => cat.id !== "oferta-semana" && cat.id !== "novedades"
  );

  const category = categories.find(c => c.id === activeCategory);

  const openCategory = (catId) => setActiveCategory(catId);

  const goBack = () => {
    if (activeCategory) setActiveCategory(null);
    else onBack();
  };

  return (
    <>
      <div className="offcanvas-backdrop fade show"></div>

      <div className="offcanvas offcanvas-start w-100 show" style={{ visibility: "visible", width: "300px" }}>
        <div className="offcanvas-header d-flex justify-content-between align-items-center">
          {/* Flecha volver */}
          <button className="btn btn-link text-dark p-0" onClick={goBack}>
            ←
          </button>

          <h5 className="offcanvas-title">
            {activeCategory ? category.label : "Categorías"}
          </h5>

          {/* X cierra todo */}
          <button
            className="btn-close"
            onClick={() => {
              setActiveCategory(null); // reinicia categoría activa
              onClose(); // cierra todos los offcanvas
            }}
          ></button>
        </div>

        <div className="offcanvas-body p-2">
          {!activeCategory &&
            categories.map(cat => (
              <button
                key={cat.id}
                className="dropdown-item py-2"
                onClick={() => cat.sections.length > 0 && openCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))
          }

          {activeCategory &&
            category.sections.map(section => (
              <div key={section.title} className="mb-3">
                <strong>{section.title}</strong>
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
            ))
          }
        </div>
      </div>
    </>
  );
}
