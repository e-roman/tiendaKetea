import { useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Thumbs, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css/thumbs";
import "swiper/css/effect-fade";

export default function HeroSlider() {

  useEffect(() => {
    // Swiper Thumbs
    const sliderThumbs = new Swiper(".js-swiper-shop-hero-thumbs", {
      modules: [Thumbs],
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slidesPerView: 3,
      spaceBetween: 15,
      on: {
        beforeInit: (swiper) => {
          const css = `
            .swiper-slide-thumb-active .swiper-thumb-progress .swiper-thumb-progress-path {
              opacity: 1;
              -webkit-animation: ${swiper.originalParams.autoplay?.delay || 3000}ms linear 0ms forwards swiperThumbProgressDash;
              animation: ${swiper.originalParams.autoplay?.delay || 3000}ms linear 0ms forwards swiperThumbProgressDash;
            }
          `;

          const style = document.createElement("style");
          style.type = "text/css";
          style.appendChild(document.createTextNode(css));
          document.head.appendChild(style);

          swiper.el
            .querySelectorAll(".js-swiper-thumb-progress")
            .forEach((slide) => {
              slide.insertAdjacentHTML(
                "beforeend",
                `<span class="swiper-thumb-progress">
                  <svg version="1.1" viewBox="0 0 160 160">
                    <path class="swiper-thumb-progress-path" d="M 79.98452083651917 4.000001576345426 A 76 76 0 1 1 79.89443752470656 4.0000733121155605 Z"></path>
                  </svg>
                </span>`
              );
            });
        },
      },
    });

    // Swiper Main
    new Swiper(".js-swiper-shop-classic-hero", {
      modules: [Navigation, Thumbs, EffectFade, Autoplay],
      autoplay: { delay: 3000 },
      loop: true,
      effect: "fade",
      speed: 600,
      fadeEffect: { crossFade: true },
      navigation: {
        nextEl: ".js-swiper-shop-classic-hero-button-next",
        prevEl: ".js-swiper-shop-classic-hero-button-prev",
      },
      thumbs: {
        swiper: sliderThumbs,
      },
    });
  }, []);

  return (
    <div className="position-relative">
      {/*<!-- Swiper Main Slider*/}
      <div className="js-swiper-shop-classic-hero swiper-container bg-light">
        <div className="swiper-wrapper">
          {/*<!-- Slide*/}
          <div className="swiper-slide">
            {/*<!-- Container*/}
            <div className="container content-space-t-1 content-space-b-2">
              <div className="row align-items-lg-center">
                <div className="col-lg-5 order-lg-2 mb-7 mb-lg-0">
                  <div className="mb-6">
                    <h1 className="display-4 mb-4">Front original design cap</h1>
                    <p>As well as being game-changers when it comes to technical innovation, Front has some of the bestselling cap in its locker.</p>
                  </div>

                  <div className="d-flex gap-2">
                    <a className="btn btn-primary btn-sm rounded-pill px-5 mr-2" href="#">Ver producto</a>
                  </div>
                </div>
                {/*<!-- End Col*/}

                <div className="col-lg-6 order-lg-1">
                  <div className="w-75 mx-auto">
                    <img className="img-fluid" src="assets/img/slider/detail-1.webp" alt="Image Description" />
                  </div>
                </div>
                {/*<!-- End Col*/}
              </div>
              {/*<!-- End Row*/}
            </div>
            {/*<!-- End Container*/}
          </div>
          {/*<!-- End Slide*/}

          {/*<!-- Slide*/}
          <div className="swiper-slide">
            {/*<!-- Container*/}
            <div className="container content-space-t-2 content-space-b-3">
              <div className="row align-items-lg-center">
                <div className="col-lg-5 order-lg-2 mb-7 mb-lg-0">
                  <div className="mb-6">
                    <h2 className="display-4 mb-4">Apple iPad Pro</h2>
                    <p>It's all new, all screen, and all powerful. Completely redesigned and packed with our most advanced technology, it will make you rethink what iPad is capable of.</p>
                  </div>

                  <div className="d-flex gap-2">
                    <a className="btn btn-primary btn-sm rounded-pill px-5 mr-2" href="#">Ver producto</a>
                  </div>
                </div>
                {/*<!-- End Col*/}

                <div className="col-lg-6 order-lg-1">
                  <div className="w-75 mx-auto">
                    <img className="img-fluid" src="assets/img/mockups/img6.png" alt="Image Description" />
                  </div>
                </div>
                {/*<!-- End Col*/}
              </div>
              {/*<!-- End Row*/}
            </div>
            {/*<!-- End Container*/}
          </div>
          {/*<!-- End Slide*/}
        </div>

        {/*<!-- Arrows*/}
        <div className="js-swiper-shop-classic-hero-button-next swiper-button-next"></div>
        <div className="js-swiper-shop-classic-hero-button-prev swiper-button-prev"></div>
      </div>
      {/*<!-- End Swiper Main Slider*/}

      {/*<!-- Swiper Thumbs Slider*/}
      <div className="position-absolute bottom-0 start-0 end-0 mb-3">
        <div className="js-swiper-shop-hero-thumbs swiper-container" style={{maxWidth:"13rem"}}>
          <div className="swiper-wrapper">
            {/*<!-- Slide*/}
            <div className="swiper-slide">
              <a className="js-swiper-thumb-progress swiper-thumb-progress-avatar" href="javascript:;" tabIndex="0">
                <img className="swiper-thumb-progress-avatar-img" src="assets/img/160x160/img11.jpg" alt="Image Description" />
              </a>
            </div>
            {/*<!-- End Slide*/}

            {/*<!-- Slide*/}
            <div className="swiper-slide">
              <a className="js-swiper-thumb-progress swiper-thumb-progress-avatar" href="javascript:;" tabIndex="0">
                <img className="swiper-thumb-progress-avatar-img" src="assets/img/160x160/img14.jpg" alt="Image Description" />
              </a>
            </div>
            {/*<!-- End Slide*/}

            {/*<!-- Slide*/}
            <div className="swiper-slide">
              <a className="js-swiper-thumb-progress swiper-thumb-progress-avatar" href="javascript:;" tabIndex="0">
                <img className="swiper-thumb-progress-avatar-img" src="assets/img/160x160/img15.jpg" alt="Image Description" />
              </a>
            </div>
            {/*<!-- End Slide*/}
          </div>
        </div>
      </div>
      {/*<!-- End Swiper Thumbs Slider*/}
    </div>
  );
}