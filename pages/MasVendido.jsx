import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import ProductCardMobile from "@/components/ProductCardMobile";

export default function MasVendidoPage() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 960);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openProduct = (slug) => navigate(`/product/${slug}`);
  const mostSale = products.filter((p) => p.mostSale === true);
  const visibles = mostSale.slice(0, limit);

  return (
    <>
      {/* BANNER */}
      <div className="container pt-3 pt-lg-4">
        <div className="row g-3 row-cols-1">
          <div className="col mb-4 mb-md-0">
            <div className="rounded-3 overflow-hidden">
              <img
                src="/assets/img/banners/banner-mas-vendidos.png"
                alt="Banner mas vendidos"
                className="img-fluid w-100 d-block"
              />
            </div>
          </div>
        </div>
      </div>

      {/* LISTA GENERAL */}
      <div className="container content-space-b-1 px-2 px-md-3 pt-4 pb-8 pt-md-8 pb-md-10">
        <div className="row g-2 gx-md-2 gy-md-3 row-cols-2 row-cols-md-3 row-cols-lg-5 mb-3 mb-md-6">
          {visibles.map((p) => (
            <div className="col" key={p.id}>
              {isMobile ? (
                <ProductCardMobile product={p} openProduct={openProduct} />
              ) : (
                <ProductCard product={p} openProduct={openProduct} />
              )}
            </div>
          ))}
        </div>

        {limit < mostSale.length && (
          <div className="text-center mt-6">
            <button
              className="btn btn-primary font-16 font-medium py-2 px-5"
              onClick={() => setLimit((v) => v + 15)}
            >
              Cargar mas
            </button>
          </div>
        )}
      </div>
    </>
  );
}
