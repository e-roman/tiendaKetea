import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import ProductCardMobile from "../components/ProductCardMobile";

import Suscribe from "../components/Suscribe";

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

      {/* Banners */}
      <div className="container content-space-t-0 content-space-b-1 content-space-lg-b-2 content-space-lg-t-0">
        <div className="row g-3 row-cols-1 row-cols-md-2">
          <div className="col mb-4 mb-md-0">
            <div
              className="card card-lg bg-img-start"
              style={{
                backgroundImage: "url(assets/img/900x900/img3.jpg)",
                minHeight: "24rem",
              }}
            >
              <div className="card-body">
                <span className="card-subtitle text-danger">
                  Descuento del mes
                </span>
                <h2 className="card-title display-4">30% OFF</h2>

                <a
                  className="btn btn-light btn-sm btn-transition rounded-pill px-6"
                  href="#"
                >
                  Ver Productos
                </a>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-lg bg-img-start"
              style={{
                backgroundImage: "url(assets/img/900x900/img4.jpg)",
                minHeight: "24rem",
              }}
            >
              <div className="card-body">
                <div className="mb-4">
                  <h2 className="card-title text-white">Lanzamiento</h2>
                  <h3 className="card-title text-white font-medium">
                    Robot Dolphin Pool up
                  </h3>
                  <p className="card-text text-white">
                    Barrefondo Para Piscina
                  </p>
                </div>

                <a
                  className="btn btn-light btn-sm btn-transition rounded-pill px-6"
                  href="#"
                >
                  Comprar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suscribe />
    </>
  );
}
