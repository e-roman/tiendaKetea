import { Link, useParams, useNavigate } from "react-router-dom";

import productsData from "@/data/products.json";
import { getProductDetails, getBreadcrumb } from "@/data/productDetails";

import useIsMobile from "@/hooks/useIsMobile";

import ProductGallery from "@/components/Product/ProductGallery";
import ProductGalleryMobile from "@/components/Product/ProductGalleryMobile";

import ProductDetail from "@/components/Product/ProductDetail";

import ProductSpecificationsBlocks from "@/components/Product/ProductSpecificationsBlocks";

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

  const details = getProductDetails(product);
  const breadcrumb = getBreadcrumb(product);

  return (
    <div className="bg-white">
      <AlertFloating />

      <div className="container pt-md-3 pt-lg-5 px-0-xs">
        <div className="row mx-xs-0">
          <div className="col-lg-12 mb-3 mb-lg-0 d-none d-md-block">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {breadcrumb.map(cat => (
                  <li className="text-dark pe-1" key={cat}>
                    <Link to={`/buscar/${encodeURIComponent(cat)}`} className="text-dark">
                      {cat}
                    </Link>
                    <i className="bi bi-chevron-right text-muted font-12 ps-1" />
                  </li>
                ))}
                <li className="text-dark active" aria-current="page">
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
            <ProductDetail product={product} details={details} />
          </div>
        </div>
      </div>

      <ProductSpecificationsBlocks details={details} />
      
      <div className="bg-light-medium">
      <ProductsOthers currentProduct={product} openProduct={openProduct} />
      </div>


    </div>
  );
}
