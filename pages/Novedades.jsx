import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import ProductCardMobile from "@/components/ProductCardMobile";

export default function NovedadesPage() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  const [limit, setLimit] = useState(10);

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

  /* =========================
     PRODUCTOS DESTACADOS
     (SIN OFERTAS)
  ========================== */
// Base: destacados sin ofertas
const destacados = products.filter(
  (p) => p.isFeatured && !p.categories.includes("ofertas")
);

// Robots
const robots = destacados.filter((p) =>
  p.categories.some((c) =>
    c.toLowerCase().includes("robot")
  )
);

// Otros productos
const otros = destacados.filter((p) =>
  !p.categories.some((c) =>
    c.toLowerCase().includes("robot")
  )
);

// Armado final:
// 5 robots + mix del resto
const visibles = [
  ...robots.slice(0, 5),
  ...otros
].slice(0, limit);


  return (
    <>
    {/* BANNER */}
    <div className="container pt-3 pt-lg-4">
      <div className="row g-3 row-cols-1">
        <div className="col mb-4 mb-md-0">
          <div className="rounded-3 overflow-hidden">
            <img
              src="/assets/img/banners/banner-novedades.png"
              alt="Banner novedades"
              className="img-fluid w-100 d-block"
            />
          </div>
        </div>
      </div>
    </div>



      {/* PRODUCTOS DESTACADOS */}
      <div className="container content-space-t-0 content-space-b-1 content-space-lg-1 px-2 px-md-3">

        {/* <div className="w-md-100 mb-5 mb-md-4 d-md-flex align-items-center justify-content-between px-3 px-md-0">
          <h3 className="font-medium pb-2 pb-md-0 mb-0">
            Productos Destacados
          </h3>
          <div className="ps-md-2">
            <Link to="/Novedades" className="font-16 font-medium">
              Ver todos
            </Link>
          </div>
        </div> */}

        <div className="row g-2 gx-md-2 gy-md-3 row-cols-2 row-cols-md-3 row-cols-lg-5 mb-3 mb-md-6">
          {visibles.map((p) => (
            <div className="col" key={p.id}>
              {isMobile ? (
                <ProductCardMobile
                  product={p}
                  openProduct={openProduct}
                />
              ) : (
                <ProductCard
                  product={p}
                  openProduct={openProduct}
                />
              )}
            </div>
          ))}
        </div>

        {/* BOTÓN CARGAR MÁS */}
        {limit < destacados.length && (
          <div className="text-center mt-8">
            <button
              className="btn btn-outline-primary border-primary px-5 py-2"
              onClick={() => setLimit(limit + 12)}
            >
              Cargar más
            </button>
          </div>
        )}
      </div>
    </>
  );
}
