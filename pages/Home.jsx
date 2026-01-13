import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

import HeroSlider from "../components/HeroSlider";
import BlockServices from "../components/BlockServices";
import Block2ColsBanners from "../components/Block2ColsBanners";
import Block3ColsBanners from "../components/Block3ColsBanners";
// import Suscribe from "../components/Suscribe";
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
        <div className="w-md-75 mb-5 mb-md-4 d-flex align-items-center">
          <h2 className="font-medium">Últimas novedades en robotos limpia psicinas.</h2>
          <div className="ps-md-2">
            <Link to="/Novedades" className="font-18 font-medium">Ver todos</Link>
          </div>
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


      <Block2ColsBanners/>


      {/* Ofertas */}
      <div className="container content-space-1 content-space-t-lg-1 px-0 px-md-3">
        <div className="w-md-75 mb-5 mb-md-4 d-flex align-items-center">
          <h2 className="font-medium mb-0">Las mejores ofertas de la semana.</h2>
          <div className="ps-md-2">
            <Link to="/ofertas" className="font-18 font-medium">Ver todos</Link>
          </div>
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



       <Block3ColsBanners/>



      {/* <Suscribe /> */}
      <BrandsLogos />
    </>
  );
}
