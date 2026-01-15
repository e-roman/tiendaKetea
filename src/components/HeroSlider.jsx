import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function App() {
  return (
    <>
    <div className='container py-5'>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={false}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper sliderHome bg-light rounded-4 overflow-hidden"
      >

        <SwiperSlide>
            <div className="">
              <div className="row align-items-lg-center">
                <div className="col-lg-12">
                  <img src='assets/img/banners/hero-4.jpg' className='w-100'/>
                </div>
                
              </div>
             
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="">
              <div className="row align-items-lg-center">
                <div className="col-lg-12">
                  <img src='assets/img/banners/hero-3.jpg' className='w-100'/>
                </div>
                
              </div>
             
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="">
              <div className="row align-items-lg-center">
                <div className="col-lg-12">
                  <img src='assets/img/banners/hero-2.jpg' className='w-100'/>
                </div>
                
              </div>
             
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="">
              <div className="row align-items-lg-center">
                <div className="col-lg-12">
                  <img src='assets/img/banners/hero-1.jpg' className='w-100'/>
                </div>
                
              </div>
             
            </div>
        </SwiperSlide>


        {/* <SwiperSlide>
            <div className="container content-space-t-1 content-space-b-1">
              <div className="row align-items-lg-center">
                <div className="col-lg-5 order-lg-2 mb-7 mb-lg-0">
                  <div className="mb-6">
                    <h1 className="display-4 mb-4">Robot Nataclor Sonar 50 </h1>
                    <p>by Maytronics Barrefondo Piscinas.</p>
                  </div>

                  <div className="d-flex gap-2">
                    <a className="btn btn-primary btn-sm rounded-pill px-5 mr-2" href="#">Ver producto</a>
                  </div>
                </div>

                <div className="col-lg-6 order-lg-1">
                  <div className="w-90 mx-auto">
                    <img className="img-fluid" src="assets/img/banners/sonar50.png" alt="Image Description" />
                  </div>
                </div>
              </div>

            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="container content-space-t-1 content-space-b-3">
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
                

                <div className="col-lg-6 order-lg-1">
                  <div className="w-90 mx-auto">
                    <img className="img-fluid" src="assets/img/banners/hero-5.png" alt="Image Description" />
                  </div>
                </div>
                
              </div>
             
            </div>
        </SwiperSlide> */}


      </Swiper>
      </div>
    </>
  );
}
