import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import productsData from "@/data/products.json";

import useIsMobile from "@/hooks/useIsMobile";

import ProductGallery from "@/components/Product/ProductGallery";
import ProductGalleryMobile from "@/components/Product/ProductGalleryMobile";

import ProductDetail from "@/components/Product/ProductDetail";

import ProductSpecificationsBlocks from "@/components/Product/ProductSpecificationsBlocks";
import ProductSpecifications from "@/components/Product/ProductSpecifications";

import ProductsOthers from "@/components/Product/ProductsOthers";

import { useFloatingAlert } from "@/context/FloatingAlertContext";
import AlertFloating from "@/components/alert/AlertFloating";

export default function ProductPage() {
  const isMobile = useIsMobile(768); 

  const navigate = useNavigate();
  const { slug } = useParams();
  const { showAlert } = useFloatingAlert();

  const safeSlug = slug?.toString().trim().toLowerCase();

  // Buscar producto por slug de forma segura
  const product = productsData.find((p) => {
    if (!p.slug) return false;
    return p.slug.toLowerCase() === safeSlug;
  });

  if (!product) {
    showAlert("Producto no encontrado", "danger");
    return <div className="container space-top-1"><p>Producto no encontrado.</p></div>;
  }

  const openProduct = (slug) => {
    navigate(`/product/${slug}`);
  };

  const category = product.category || "Productos";
  const subcategory = product.subcategory || "Detalle";

  return (
    <div className="bg-white">
      <AlertFloating />

      <div className="container pt-3 pt-lg-5 px-0-xs">
        <div className="row mx-xs-0">
          <div className="col-lg-12 mb-3 mb-lg-0 d-none d-md-block">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <span>
                    {category}
                  </span>
                </li>
                <li className="breadcrumb-item">
                  <span>
                    {subcategory}
                  </span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.title}
                </li>
              </ol>
            </nav>
          </div>

          <div className="col-lg-8 mb-5 mb-lg-0 px-xs-0">
            <div className="pe-lg-3">
              {isMobile ? (
                <ProductGalleryMobile product={product} />
              ) : (
                <ProductGallery product={product} />
              )}
            </div>
          </div>


          <div className="col-lg-4">
            <ProductDetail product={product} />
          </div>
        </div>
      </div>

      <ProductSpecificationsBlocks />
      
      <div className="bg-light-medium">
      <ProductsOthers currentProduct={product} openProduct={openProduct} />
      </div>


    </div>
  );
}
