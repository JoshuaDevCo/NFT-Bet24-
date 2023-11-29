import React from "react";
import "./DashboardMatch_Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import dash from "../Assets/dashs.jpg"
import dash1 from "../Assets/dash1.jpg"
import dash2 from "../Assets/dash2.png"
// import './styles.css';

function DashboardMatch_Slider() {
  return (
    <div className=" d-lg-block">
      <>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
        modules={[Autoplay, Pagination]} 
        className="mySwiper">
          <SwiperSlide>
            <div>
                <img src={dash} alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src={dash1} alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
          
                <img src={dash2} alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src={dash} alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src={dash1} alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src={dash2} alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src={dash} alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
            <img src={dash1} alt="" className="w-100" />
            </div>
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
}

export default DashboardMatch_Slider;
