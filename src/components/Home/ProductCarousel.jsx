import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCardMobile from "../ProductCardMobile";

export default function ProductCarousel({ products, openProduct }) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1.75}
      slidesOffsetBefore={16} // ← espacio SOLO al inicio
      grabCursor
    >
      {products.map((p) => (
        <SwiperSlide key={p.id}>
          <ProductCardMobile
            product={p}
            openProduct={openProduct}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
