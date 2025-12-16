import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "../ProductCard";

export default function ProductCarousel({ products, openProduct }) {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.15}
      grabCursor
    >
      {products.map((p) => (
        <SwiperSlide key={p.id}>
          <ProductCard product={p} openProduct={openProduct} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
