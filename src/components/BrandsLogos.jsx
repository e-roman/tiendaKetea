import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const BRANDS = [
  "../assets/img/brands/logos/logo-7.png",
  "../assets/img/brands/logos/logo-2.png",
  "../assets/img/brands/logos/logo-1.png",
  "../assets/img/brands/logos/logo-4.png",
  "../assets/img/brands/logos/logo-5.png",
  "../assets/img/brands/logos/logo-3.png",
  "../assets/img/brands/logos/logo-4.png",
  "../assets/img/brands/logos/logo-5.png",
  "../assets/img/brands/logos/logo-3.png",
  "../assets/img/brands/logos/logo-3.png",
  "../assets/img/brands/logos/logo-4.png",
  "../assets/img/brands/logos/logo-5.png",
  "../assets/img/brands/logos/logo-3.png",
];

export default function BrandsLogos() {
  return (
    <div className="bg-white">
      <div className="container px-0 px-md-3 pb-3 pt-6 position-relative">
        <Swiper
          id="brandsLogos"
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView="auto"
          navigation
          keyboard
          grabCursor
        >
          {BRANDS.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="py-3">
                <img
                  src={src}
                  alt={`Brand ${index + 1}`}
                  className="brand-logo filter-grey"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <hr />
      </div>
    </div>
  );
}
