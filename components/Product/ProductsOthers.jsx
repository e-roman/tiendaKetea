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
        cssMode={true}
        navigation={true}
        pagination={false}
        mousewheel={true}
        keyboard={true}
        slidesPerView={4}
        spaceBetween={20}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} openProduct={openProduct} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
