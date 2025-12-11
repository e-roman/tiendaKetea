import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import products from "../../data/products.json";
import ProductCard from "../../components/ProductCard";

export default function ProductsSwiper({ openProduct }) {

  return (
    <div className="container space-2 space-lg-3">
      <Swiper
        cssMode={false}
        navigation={true}
        pagination={false}
        mousewheel={false}
        keyboard={true}
        slidesPerView={4}
        spaceBetween={20}
        simulateTouch={false}
        allowTouchMove={false}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.slug}>
            <ProductCard product={product} openProduct={openProduct} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
