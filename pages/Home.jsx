import { useNavigate } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

import HeroSlider from "../components/HeroSlider";
import BlockServices from "../components/BlockServices";
import Suscribe from "../components/Suscribe";
import BrandsLogos from "../components/BrandsLogos";

import ProductGrid from "../components/Home/ProductGrid";
import ProductCarousel from "../components/Home/ProductCarousel";
import useMediaQuery from "../src/hooks/useMediaQuery";

export default function Home() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const openProduct = (slug) => {
    navigate(`/product/${slug}`);
  };

  const destacados = products.filter((p) =>
    p.categories.includes("destacados")
  );
  const ofertas = products.filter((p) =>
    p.categories.includes("ofertas")
  );

  // const navigate = useNavigate();

  // const openProduct = (slug) => {
  //   navigate(`/product/${slug}`);
  // };

  // // Filtrar productos por categorías
  // const destacados = products.filter((p) => p.categories.includes("destacados"));
  // const ofertas = products.filter((p) => p.categories.includes("ofertas"));

  return (
    <>
      <HeroSlider />
      <BlockServices />

      {/* Productos Destacados */}
      <div className="container content-space-2 content-space-lg-1 px-0 px-md-3">
        <div className="w-md-75 mb-5 mb-md-4">
          <h2 className="font-bold">Novedades</h2>
        </div>

        {isMobile ? (
          <ProductCarousel
            products={products.filter(p => p.isFeatured)}
            openProduct={openProduct}
          />
        ) : (
          <ProductGrid
            products={products}
            openProduct={openProduct}
            type="novedades"
          />
        )}

      </div>

      {/* Banners */}
      <div className="container">
        <div className="row g-3 row-cols-1 row-cols-md-2">
          <div className="col mb-4 mb-md-0">
            <div className="card card-lg shadow-none bg-img-start" style={{backgroundImage: "url(assets/img/banners/banner-md-3.png)", minHeight: "24rem"}}>
              <div className="card-body">
                <span className="card-subtitle text-danger">Descuento del mes</span>
                <h2 className="card-title display-4">30% OFF</h2>

                <a className="btn btn-primary btn-sm btn-transition rounded-pill px-6" href="#">Ver Productos</a>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card card-lg shadow-none bg-img-start" style={{backgroundImage: "url(assets/img/banners/banner-md-2-bg.png)", minHeight: "24rem"}}>
              <div className="card-body">
                <div className="mb-4">
                  <h2 className="card-title">Lanzamiento</h2>
                  <h3 className="card-title font-medium ">Robot Dolphin Pool up</h3>
                  <p className="card-text">Barrefondo Para Piscina</p>
                </div>

                <a className="btn btn-primary btn-sm btn-transition rounded-pill px-6" href="#">Ver Producto</a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Ofertas */}
      <div className="container content-space-2 content-space-lg-1 px-0 px-md-3">
        <div className="w-md-75 mb-5 mb-md-4">
          <h2 className="font-bold">Ofertas</h2>
        </div>


        {isMobile ? (
          <ProductCarousel
            products={products.filter(p => p.categories.includes("ofertas"))}
            openProduct={openProduct}
          />
        ) : (
          <ProductGrid
            products={products}
            openProduct={openProduct}
            type="ofertas"
          />
        )}

      </div>

      <Suscribe />
      <BrandsLogos />
    </>
  );
}
