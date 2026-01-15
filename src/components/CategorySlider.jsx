import { Link } from "react-router-dom";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "@/components/ProductCard";
import ProductCardMobile from "@/components/ProductCardMobile";

export default function CategorySlider({
  title,
  category,
  products,
  isMobile,
  openProduct,
  link,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const categoryProducts = products
    .filter((p) =>
      p.categories.some((c) =>
        c.toLowerCase().includes(category.toLowerCase())
      )
    )
    .slice(0, 10);

  if (!categoryProducts.length) return null;

  return (
    <div className="rowCategory mb-10 position-relative">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">{title}</h3>
        <Link to={link} className="font-medium">
          Ver todos
        </Link>
      </div>

      {/* Flechas */}
      {!isMobile && (
        <>
          <button ref={prevRef} className="swiper-button-prev" />
          <button ref={nextRef} className="swiper-button-next" />
        </>
      )}

      <Swiper
        modules={[Navigation, Keyboard]}
        keyboard
        spaceBetween={10}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          0: { slidesPerView: 1.6, allowTouchMove: true },
          576: { slidesPerView: 2.4 },
          768: { slidesPerView: 3.2 },
          960: { slidesPerView: 5, allowTouchMove: false },
        }}
      >
        {categoryProducts.map((p) => (
          <SwiperSlide key={p.id}>
            {isMobile ? (
              <ProductCardMobile product={p} openProduct={openProduct} />
            ) : (
              <ProductCard product={p} openProduct={openProduct} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
