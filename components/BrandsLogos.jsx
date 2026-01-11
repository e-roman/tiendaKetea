// src/components/BrandsLogos.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BRANDS = [
  "../assets/img/brands/07.jpg",
  "../assets/img/brands/01.jpg",
  "../assets/img/brands/04.jpg",
  "../assets/img/brands/03.jpg",
  "../assets/img/brands/05.jpg",
];

export default function BrandsLogos() {
  return (
    <div className="container content-space-2 border-bottom">
      <Swiper
        spaceBetween={24}
        slidesPerView={2.3}     // mobile: 2 + un poco del 3°
        centeredSlides={false}
        breakpoints={{
          576: {
            slidesPerView: 3.2,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: BRANDS.length, // desktop: todos visibles
            allowTouchMove: false,        // desactiva swipe en desktop
          },
        }}
      >
        {BRANDS.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="text-center py-3">
              <img
                className="avatar avatar-xl avatar-4x3 filter-grey"
                src={src}
                alt={`Brand ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
