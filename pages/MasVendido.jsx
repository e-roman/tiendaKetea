import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import products from "@/data/products.json";
import CategorySlider from "@/components/CategorySlider";

export default function MasVendidoPage() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  const [visibleRows, setVisibleRows] = useState(3);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 960);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openProduct = (slug) => navigate(`/product/${slug}`);

  const mostSale = products.filter((p) => p.mostSale === true);

  const categoriesConfig = [
    { title: "Robots limpia piscinas", category: "Robots" },
    { title: "Bombas de calor", category: "Bombas de Calor" },
    { title: "Filtros para piscinas", category: "Filtros" },
    { title: "Productos químicos", category: "Químicos" },
    { title: "Válvulas y accesorios", category: "Válvulas" },
    { title: "Accesorios de limpieza", category: "Accesorios" },
  ];

  return (
    <>
      {/* BANNER */}
      <div className="container-fluid ps-0">
        <div
          className="bg-img-start"
          style={{
            backgroundImage: "url(assets/img/900x900/img3.jpg)",
            minHeight: "24rem",
          }}
        />
      </div>

      {/* CATEGORÍAS */}
      <div className="container content-space-b-1 px-2 px-md-3">
        {categoriesConfig.slice(0, visibleRows).map((cat, index) => (
          <CategorySlider
            key={cat.category}
            title={cat.title}
            category={cat.category}
            products={mostSale}
            isMobile={isMobile}
            openProduct={openProduct}
            link="/Mas-vendidos"
          />
        ))}

        {/* MOSTRAR MÁS */}
        {visibleRows < categoriesConfig.length && (
          <div className="text-center mt-6">
            <button
              className="btn btn-primary font-16 font-medium py-2 px-5"
              onClick={() => setVisibleRows((v) => v + 3)}
            >
              Mostrar más
            </button>
          </div>
        )}
      </div>
    </>
  );
}
