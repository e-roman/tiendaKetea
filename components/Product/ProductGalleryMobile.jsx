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

  return (
    <Swiper
      slidesPerView={1.1}
      spaceBetween={12}
      pagination={{ clickable: true }}
      modules={[Pagination]}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={product.title}
            className="img-fluid rounded"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

