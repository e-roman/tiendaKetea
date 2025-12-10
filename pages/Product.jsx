import { useParams } from "react-router-dom";
import productsData from "../data/products.json";

import ProductGallery from "../components/Product/ProductGallery";
import ProductDetail from "../components/Product/ProductDetail";
import ProductSpecificationsBlocks from "../components/Product/ProductSpecificationsBlocks";
import ProductsOthers from "../components/Product/ProductsOthers";
import { useFloatingAlert } from "../src/context/FloatingAlertContext"; // ruta correcta
import AlertFloating from "../components/AlertFloating";

export default function ProductPage() {
  const { id } = useParams();
  const { showAlert } = useFloatingAlert(); // solo para disparar alertas

  const product = productsData.find((p) => p.id === Number(id));

  if (!product) {
    showAlert("Producto no encontrado", "danger"); // dispara alerta global
    return <p>Producto no encontrado.</p>;
  }

  const category = product.category || "Productos";
  const subcategory = product.subcategory || "Detalle";

  return (
    <div>
      {/* ALERTA GLOBAL */}
      <AlertFloating />

      <div className="container space-top-1 space-top-sm-1">
        <div className="row">
          <div className="col-lg-12 mb-3 mb-lg-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href={`/categoria/${category.toLowerCase()}`}>{category}</a>
                </li>
                <li className="breadcrumb-item">
                  <a href={`/categoria/${category.toLowerCase()}/${subcategory.toLowerCase()}`}>{subcategory}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
              </ol>
            </nav>
          </div>

          <div className="col-lg-8 mb-7 mb-lg-0">
            <div className="pe-lg-3">
              <ProductGallery product={product} />
            </div>
          </div>

          <div className="col-lg-4">
            <ProductDetail product={product} />
          </div>
        </div>
      </div>

      <ProductSpecificationsBlocks />
      <ProductsOthers />
      {/* <ProductsReviews productId={product.id} /> */}
    </div>
  );
}
