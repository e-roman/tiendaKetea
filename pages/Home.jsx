import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

import HeroSlider from "@/components/HeroSlider";
import BlockServices from "@/components/BlockServices";
import Block2ColsBanners from "@/components/Block2ColsBanners";
import Block3ColsBanners from "@/components/Block3ColsBanners";

import ProductGrid from "@/components/Home/ProductGrid";
import ProductCarousel from "@/components/Home/ProductCarousel";
import useMediaQuery from "@/hooks/useMediaQuery";

/* Helper: Ofertas variadas por categoría */
const getWeeklyOffers = (products, limitPerCategory = 2) => {
  const offers = products.filter(
    (p) => p.categories.includes("ofertas") || p.discount > 0
  );

  const grouped = {};

  offers.forEach((p) => {
    const mainCategory = p.categories[0]; // Piscinas / Accesorios / Químicos

    if (!grouped[mainCategory]) {
      grouped[mainCategory] = [];
    }

    if (grouped[mainCategory].length < limitPerCategory) {
      grouped[mainCategory].push(p);
    }
  });

  return Object.values(grouped)
    .flat()
    .sort(() => Math.random() - 0.5);
};

export default function Home() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const weeklyOffers = getWeeklyOffers(products, 2);

  const openProduct = (slug) => {
    navigate(`/product/${slug}`);
  };

  return (
    <>
      <HeroSlider />
      <BlockServices />

      {/* Productos Destacados */}
      <div className="container py-4 content-space-lg-1 px-0 px-md-3">
         <div className="w-100 d-flex align-items-center justify-content-between mb-3 px-3 px-md-0">
          <h3 className="title-sections-hm font-medium mb-0">
            Últimas novedades <span className="d-none d-md-inline">en robots limpia piscinas.</span>
          </h3>
          <div className="ps-md-2">
            <Link to="/Novedades" className="font-16 font-medium">
              Ver todos
            </Link>
          </div>
        </div>

        {isMobile ? (
          <ProductCarousel
            products={products.filter((p) => p.isFeatured)}
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

      <Block2ColsBanners />

      {/*  Mejores ofertas de la semana */}
      <div className="container py-4 content-space-t-lg-1 px-0 px-md-3">
        <div className="w-100 d-flex align-items-center justify-content-between mb-3 px-3 px-md-0">
          <h3 className="font-medium mb-0">
            <span className="d-none d-md-inline">Las mejores</span> Ofertas de la semana.
          </h3>
          <div className="ps-md-2">
            <Link to="/Descuentos" className="font-16 font-medium">
              Ver todos
            </Link>
          </div>
        </div>

        {isMobile ? (
          <ProductCarousel
            products={weeklyOffers}
            openProduct={openProduct}
          />
        ) : (
          <ProductGrid
            products={weeklyOffers}
            openProduct={openProduct}
          />
        )}
      </div>

      <Block3ColsBanners />
    </>
  );
}
