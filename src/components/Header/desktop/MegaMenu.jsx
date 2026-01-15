// src/components/header/MegaMenu.jsx
import { useState } from "react";
import { megaMenuData } from "./megaMenuData";
import { Link } from "react-router-dom";

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState(megaMenuData[0]);

  const hasSections =
    Array.isArray(activeCategory.sections) &&
    activeCategory.sections.length > 0;

  return (
    <div className="mega-menu shadow">
      <div className="container">
        <div className="mega-menu-inner d-flex">

          {/* Columna izquierda */}
          <aside className="mega-menu-left">
            {megaMenuData.map(cat => (
            <button
              className={`mega-menu-cat ${
                activeCategory.id === cat.id ? "active" : ""
              } ${cat.highlight ? "fw-bold" : ""}`}
              onMouseEnter={() => setActiveCategory(cat)}
            >
              {cat.label}
            </button>

            ))}
          </aside>

          {/* Panel derecho SOLO si hay secciones */}
          {hasSections && (
            <section className="mega-menu-right">
              <div className="row">
                {activeCategory.sections.map((section, idx) => (
                  <div key={idx} className="col-md-3 pb-5">
                    <h6 className="mega-title">{section.title}</h6>
                    <ul className="list-unstyled">
                      {section.items.map(item => (
                        <li key={item}>
                          <Link to="/pages/ProductsGrid">{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}

