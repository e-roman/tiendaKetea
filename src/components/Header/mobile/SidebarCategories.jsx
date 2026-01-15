import { useState } from "react";
import { Link } from "react-router-dom";
import { megaMenuData } from "../desktop/megaMenuData";

// helper para slug
const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function SidebarCategories() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="offcanvas offcanvas-start categoriesMb"
      id="categoriesOffcanvas"
      tabIndex="-1"
    >
      {/* HEADER */}
      <div className="offcanvas-header border-bottom">
        <h4 className="mb-0">Todas las Categorías</h4>
        <button className="btn-close" data-bs-dismiss="offcanvas" />
      </div>

      {/* BODY */}
      <div className="offcanvas-body p-0 bg-light">
        <ul className="list-unstyled mb-0">

          {megaMenuData
            .filter(cat => cat.sections && cat.sections.length > 0)
            .map((cat) => {

              const isOpen = openId === cat.id;
              const hasChildren = cat.sections?.length > 0;

            return (
              <li key={cat.id} className="">

                {/* CATEGORÍA PRINCIPAL */}
                {hasChildren ? (
                  <button
                    type="button"
                    className={`w-100 d-flex justify-content-between align-items-center px-3 py-3 bg-transparent border-0 text-start fw-${
                      cat.highlight ? "bold" : "normal"
                    }`}
                    onClick={() => toggle(cat.id)}
                  >
                    <span className={cat.highlight ? "fw-bold" : ""}>
                      {cat.label}
                    </span>

                    <i
                      className={`bi bi-chevron-${
                        isOpen ? "up" : "down"
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={`/categoria/${slugify(cat.label)}`}
                    className={`d-block px-3 py-3 text-decoration-none text-dark ${
                      cat.highlight ? "fw-bold text-primary" : ""
                    }`}
                    data-bs-dismiss="offcanvas"
                  >
                    {cat.label}
                  </Link>
                )}

                {/* SUBCATEGORÍAS */}
                {hasChildren && (
                  <div
                    className={`collapse-wrapper ${
                      isOpen ? "open" : ""
                    }`}
                    style={{
                      maxHeight: isOpen ? "1000px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.35s ease",
                    }}
                  >
                    {cat.sections.map((section, idx) => (
                      <div key={idx} className="px-4 pb-3">

                        <p className="small fw-bold text-uppercase mt-2 mb-2">
                          {section.title}
                        </p>

                        <ul className="list-unstyled mb-0">
                          {section.items.map((item, i) => (
                            <li key={i}>
                              <Link
                                to={`/categoria/${slugify(
                                  cat.label
                                )}/${slugify(item)}`}
                                className="d-block py-1 text-decoration-none text-secondary"
                                data-bs-dismiss="offcanvas"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
