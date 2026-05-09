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
    <div className="container pt-3 pt-lg-4">
      <div className="row g-3 row-cols-1">
        <div className="col mb-4 mb-md-0">
          <div className="rounded-3 overflow-hidden">
            <img
              src="/assets/img/banners/banner-mas-vendidos.png"
              alt="Banner más vendidos"
              className="img-fluid w-100 d-block"
            />
          </div>
        </div>
      </div>
    </div>

      {/* CATEGORÍAS */}
      <div className="container content-space-b-1 px-2 px-md-3 pt-4 pb-8 pt-md-8 pb-md-10">
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
