import { useNavigate } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

import HeroSlider from "../components/HeroSlider";
import BlockServices from "../components/BlockServices";
import Suscribe from "../components/Suscribe";
import BrandsLogos from "../components/BrandsLogos";

export default function Home() {
  const navigate = useNavigate();

  const openProduct = (id) => {
    navigate(`/product/${id}`);
  };

  // Filtrar productos por categorías
  const destacados = products.filter((p) => p.categories.includes("destacados"));
  const blackFriday = products.filter((p) => p.categories.includes("BlackFriday"));

  return (
    <>
      <HeroSlider />
      <BlockServices />

      {/* Productos Destacados */}
      <div className="container py-4">
        <h3 className="mb-4">Productos Destacados</h3>
        <div className="row g-4">
          {destacados.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} openProduct={openProduct} />
            </div>
          ))}
        </div>
      </div>


      {/* Banners */}
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="card card-lg bg-img-start" style={{backgroundImage: "url(assets/img/900x900/img3.jpg); min-height: 24rem"}}>
              <div className="card-body">
                <span className="card-subtitle text-danger">Descuento del mes</span>
                <h2 className="card-title display-4">30% OFF</h2>

                <a className="btn btn-light btn-sm btn-transition rounded-pill px-6" href="#">Ver Productos</a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card card-lg bg-img-start" style={{backgroundImage: "url(assets/img/900x900/img4.jpg); min-height: 24rem"}}>
              <div className="card-body">
                <div className="mb-4">
                  <h2 className="card-title text-white">Lanzamiento</h2>
                  <h3 className="card-title text-white font-medium ">Robot Dolphin Pool up</h3>
                  <p className="card-text text-white">Barrefondo Para Piscina</p>
                </div>

                <a className="btn btn-light btn-sm btn-transition rounded-pill px-6" href="#">Comprar</a>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Black Friday */}
      <div className="container content-space-2 content-space-lg-2">
        <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
          <h2>Ofertas Black Friday</h2>
        </div>

        <div className="row g-4 row-cols-2 row-cols-md-3 row-cols-lg-4 mb-3">
          {blackFriday.map((p) => (
            <div className="col" key={p.id}>
              <ProductCard product={p} openProduct={openProduct} />
            </div>
          ))}
        </div>
      </div>

      <Suscribe />
      <BrandsLogos />
    </>
  );
}
