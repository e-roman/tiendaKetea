import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import ProductCardMobile from "../components/ProductCardMobile";

import Suscribe from "../components/Suscribe";
import BrandsLogos from "../components/BrandsLogos";

export default function NovedadesPage() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 960
  );

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

  // Filtrar productos por categorías
  const destacados = products.filter((p) =>
    p.categories.includes("destacados")
  );

  return (
    <>
      {/* Banners */}
      <div className="container-fluid ps-0 content-space-t-0 content-space-b-0 content-space-lg-b-0 content-space-lg-t-0">
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

      {/* Productos Destacados */}
      <div className="container content-space-t-0 content-space-b-1 content-space-lg-1 px-2 px-md-3">
        <div className="row g-2 g-md-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
          {destacados.map((p) => (
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
      </div>



      <Suscribe />
      <BrandsLogos />
    </>
  );
}
