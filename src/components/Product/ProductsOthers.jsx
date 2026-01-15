import { useRef, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import ProductCardMobile from "@/components/ProductCardMobile";

export default function ProductsSwiper({ openProduct }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 960
  );

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Título */}
      <div className="container  content-space-t-lg-1">
        <div className="mb-4 mb-md-6">
          <h2>También podría interesarte</h2>
        </div>
      </div>

      {/* Swiper */}
      <div className="container content-space-b-1 content-space-b-lg-1 position-relative otherProducts px-0 px-md-3">
        <div>
          <button
            ref={prevRef}
            className="border-0 swiper-button-prev"
            aria-label="Anterior"
          />

          <button
            ref={nextRef}
            className="border-0 swiper-button-next"
            aria-label="Siguiente"
          />

          <Swiper
            modules={[Navigation, Keyboard]}
            keyboard
            spaceBetween={8}
            slidesOffsetBefore={16}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.75,
                spaceBetween: 10,
                slidesOffsetBefore: 16,
                allowTouchMove: true,
              },
              960: {
                slidesPerView: 5,
                slidesOffsetBefore: 0,
                allowTouchMove: false,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.slug}>
                {isMobile ? (
                  <ProductCardMobile
                    product={product}
                    openProduct={openProduct}
                  />
                ) : (
                  <ProductCard
                    product={product}
                    openProduct={openProduct}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
