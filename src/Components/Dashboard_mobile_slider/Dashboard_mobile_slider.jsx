// import React from 'react'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Dashboard_mobile_slider.css"
import dp1 from '../../icoons/doll1.jpg'
import dp2 from '../../icoons/doll2.jpg'
import dp3 from '../../icoons/doll3.jpg'
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Dashboard_mobile_slider() {
  return (
    <div className='d-block d-lg-none mt-4'>
    <div className='our_css'> <span>Our Casino  </span></div>
      <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
     
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>  <img src={dp1} alt="" className="w-100" /></SwiperSlide>
        <SwiperSlide>  <img src={dp2} alt="" className="w-100" /></SwiperSlide>
        <SwiperSlide>  <img src={dp3} alt="" className="w-100" /></SwiperSlide>
        <SwiperSlide>  <img src={dp1} alt="" className="w-100" /></SwiperSlide>
        <SwiperSlide>  <img src={dp2} alt="" className="w-100" /></SwiperSlide>
        <SwiperSlide>  <img src={dp3} alt="" className="w-100" /></SwiperSlide>
   
      </Swiper>
    </>
    </div>
  )
}
