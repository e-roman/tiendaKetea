import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import products from "../../data/products.json";
import ProductCard from "../../components/ProductCard";

export default function ProductsSwiper({ openProduct }) {
  return (
    <>
      {/* Título */}
      <div className="container content-space-t-2 content-space-t-lg-4">
        <div className="mb-4 mb-md-6">
          <h2>También podría interesarte</h2>
        </div>
      </div>

      {/* Swiper */}
      <div className="container content-space-b-1 content-space-b-lg-3">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          spaceBetween={20}
          navigation
          keyboard
          breakpoints={{
            // Mobile
            0: {
              slidesPerView: 1.15,
              spaceBetween: 16,
              allowTouchMove: true,
              simulateTouch: true,
              navigation: false,
            },

            // Tablet
            576: {
              slidesPerView: 2.2,
              spaceBetween: 16,
              allowTouchMove: true,
              navigation: false,
            },

            // Desktop
            992: {
              slidesPerView: 4,
              spaceBetween: 20,
              allowTouchMove: false,
              simulateTouch: false,
              navigation: true,
            },
          }}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.slug}>
              <ProductCard
                product={product}
                openProduct={openProduct}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
