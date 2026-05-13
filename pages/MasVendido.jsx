import { useNavigate } from "react-router-dom";

import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

export default function MasVendidoPage() {
  const navigate = useNavigate();

  const openProduct = (slug) => navigate(`/product/${slug}`);

  const mostSale = products.filter((p) => p.mostSale === true);

  return (
    <>
      {/* BANNER */}
      <div className="container pt-3 pt-lg-5">
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

      {/* GRILLA UNIFICADA */}
      <div className="container content-space-b-1 px-2 px-md-3 pt-4 pb-8 pt-md-5 pb-md-10">
        <div className="row gy-3 gx-2 row-cols-2 row-cols-md-3 row-cols-lg-5">
          {mostSale.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} openProduct={openProduct} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
