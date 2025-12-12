import { useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import Suscribe from "../components/Suscribe";

export default function DescuentosPage() {
  const navigate = useNavigate();

  const openProduct = (slug) => {
    navigate(`/product/${slug}`);
  };

  const [limit, setLimit] = useState(12);

  // Filtrar productos por categoría
  const descuentos = products.filter((p) =>
    p.categories.includes("ofertas")
  );

  // Productos visibles según el límite
  const visibles = descuentos.slice(0, limit);

  return (
    <>
      {/* Productos descuentos */}
      <div className="container content-space-1">
        <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
          {visibles.map((p) => (
            <div className="col" key={p.id}>
              <ProductCard product={p} openProduct={openProduct} />
            </div>
          ))}
        </div>

        {/* Botón "Cargar más" solo si hay más productos */}
        {limit < descuentos.length && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => setLimit(limit + 12)}
            >
              Cargar más
            </button>
          </div>
        )}
      </div>

      {/* Banners */}
      <div className="container content-space-b-2">
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
