import { useState, useEffect } from "react";
import { useCart } from "../../src/hooks/useCart";
import { useFavorites } from "../../src/hooks/useFavorites";
import { useFloatingAlert } from "../../src/context/FloatingAlertContext";
import AlertFloating from "../AlertFloating";

// src/components/Product/ProductGalleryMobile.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import products from "../../data/products.json";

export default function ProductGalleryMobile({ product }) {
  const images = product.images?.length
    ? product.images
    : [product.image];


  const { favorites, toggleFavorite } = useFavorites();


  // Verificar si ya está en favoritos
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fav = favorites.some((f) => f.slug === product.slug);
    setIsFavorite(fav);
  }, [favorites, product.slug]);


  const formatAR = (number) =>
    number.toLocaleString("es-AR", { minimumFractionDigits: 0 });

  const { showAlert } = useFloatingAlert(); // solo la función

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    const newFavState = !isFavorite;
    setIsFavorite(newFavState);
    showAlert(newFavState ? "Agregaste a favoritos" : "Eliminaste un favorito", "success");
  };


  return (
    <>

    {/* Código + rating */}
    <div className="d-flex align-items-center justify-content-between small mb-2 px-3">
      <p className="link-muted mb-0">
        <small>Código: {product.code || "N/A"}</small>
      </p>

      <div className="d-flex align-items-center">
        <div>
          <a href="#reviewSection" className="small">
            Ver comentarios
          </a>
        </div>

        <div className="text-warning ms-2 d-flex gap-1">
          {[...Array(5)].map((_, i) => (
            <small key={i} className="bi bi-star-fill"></small>
          ))}
        </div>
      </div>
    </div>

    {/* Título + Favorito */}
    <div className="d-flex justify-content-between align-items-start px-3">
      <h1 className="title-product font-bold mb-0">{product.title}</h1>
    </div>



    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{ clickable: true }}
      modules={[Pagination]}
    >
        <button
          type="button"
          className={`btn-fav btn btn-xs p-3 btn-icon rounded-circle btn-fav-xs ${
            isFavorite ? "text-danger" : "text-muted"
          }`}
          onClick={handleToggleFavorite}
        >
          <i className={isFavorite ? "bi-heart-fill" : "bi-heart"}></i>
        </button>


      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={product.title}
            className="img-fluid w-100 rounded img-detail-mb"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>

  </> 
  );
}

