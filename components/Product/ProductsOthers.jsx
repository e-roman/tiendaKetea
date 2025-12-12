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
    <>
      {/* Productos Destacados */}
      <div className="container content-space-t-2 content-space-t-lg-4">
        <div className="mb-4 mb-md-6">
          <h2>También podría interesarte</h2>
        </div> 
      </div>


      <div className="container content-space-b-1 content-space-b-lg-3">
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

    </>
  );
}
