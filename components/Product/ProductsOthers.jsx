import React from "react";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import products from "../../data/products.json";
import ProductCard from "../../components/ProductCard";

export default function ProductsSwiper({ openProduct }) {


const prevRef = useRef(null);
const nextRef = useRef(null);
  return (
    <>
      {/* Título */}
      <div className="container content-space-t-2 content-space-t-lg-4">
        <div className="mb-4 mb-md-6">
          <h2>También podría interesarte</h2>
        </div>
      </div>

      {/* Swiper */}
      <div className="container content-space-b-1 content-space-b-lg-3 position-relative otherProducts">
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
            spaceBetween={20}
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
                slidesPerView: 1.15,
                allowTouchMove: true,
              },
              576: {
                slidesPerView: 2.2,
                allowTouchMove: true,
              },
              992: {
                slidesPerView: 4,
                allowTouchMove: false,
              },
            }}
            className="mySwiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.slug}>
                <ProductCard product={product} openProduct={openProduct} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </>
  );
}
