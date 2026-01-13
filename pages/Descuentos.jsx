import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import ProductCardMobile from "../components/ProductCardMobile";

export default function DescuentosPage() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  const [visibleRows, setVisibleRows] = useState(3); // 👈 inicia con 3 rows

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openProduct = (slug) => {
    navigate(`/product/${slug}`);
  };

  // Productos en oferta
  const descuentos = products;

  // Configuración de filas/categorías
const categoriesConfig = [
  { title: "Robots limpia piscinas", category: "Robots" },
  { title: "Bombas de calor", category: "Bombas de Calor" },
  { title: "Filtros para piscinas", category: "Filtros" },
  { title: "Productos químicos", category: "Químicos" },
  { title: "Válvulas y accesorios", category: "Válvulas" },
  { title: "Accesorios de limpieza", category: "Accesorios" },
];


  // Rows visibles
  const visibleCategories = categoriesConfig.slice(0, visibleRows);

  return (
    <>
      {/* BANNER */}
      <div className="container-fluid ps-0 content-space-t-0 content-space-b-0">
        <div className="row g-3 row-cols-1">
          <div className="col mb-4 mb-md-0">
            <div
              className="bg-img-start"
              style={{
                backgroundImage: "url(assets/img/900x900/img3.jpg)",
                minHeight: "24rem",
              }}
            >
              <div className="card-body" />
            </div>
          </div>
        </div>
      </div>

      {/* ROWS DE CATEGORÍAS */}
      <div className="container content-space-t-0 content-space-b-1 content-space-lg-1 px-2 px-md-3">

{visibleCategories.map((cat, index) => (
  <div className="rowCategory" key={index}>
    <div className="w-md-100 mb-5 mb-md-4 d-md-flex align-items-center justify-content-between px-3 px-md-0">
      <h3 className="font-medium pb-2 pb-md-0 mb-0">
        {cat.title}
      </h3>
      <div className="ps-md-2">
        <Link to="/Ofertas" className="font-16 font-medium">
          Ver todos
        </Link>
      </div>
    </div>

<div className="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-5 mb-6">
  {products
    .filter((p) =>
      p.categories.some((c) =>
        c.toLowerCase().includes(cat.category.toLowerCase())
      )
    )
    .slice(0, 5)
    .map((p) => (
      <div className="col" key={p.id}>
        {isMobile ? (
          <ProductCardMobile product={p} openProduct={openProduct} />
        ) : (
          <ProductCard product={p} openProduct={openProduct} />
        )}
      </div>
    ))}
</div>


  </div>
))}


        {/* BOTÓN MOSTRAR MÁS ROWS */}
        {visibleRows < categoriesConfig.length && (
          <div className="text-center mt-8">
            <button
              className="btn btn-outline-primary border-primary px-5 py-2"
              onClick={() => setVisibleRows((prev) => prev + 3)}
            >
              Mostrar más
            </button>
          </div>
        )}
      </div>
    </>
  );
}
