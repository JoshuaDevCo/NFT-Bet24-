import React, { Component } from "react";
import Slider from "react-slick";
import dp1 from '../../icoons/doll1.jpg'
import dp2 from '../../icoons/doll2.jpg'
import dp3 from '../../icoons/doll3.jpg'
import "./slider.css"

export default class VerticalSwipeToSlide extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      vertical: true,
      autoplay: true,
      autoplaySpeed: 2000,
      verticalSwiping: true,
      swipeToSlide: true,
      beforeChange: function(currentSlide, nextSlide) {
        // console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function(currentSlide) {
        // console.log("after change", currentSlide);
      }
    };
    return (
      <div className="mt-3  rightSldR">
        <Slider {...settings}>
          <div className="text-center">
            <div className="CustomSlider">
                <img src={dp1} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
          <div className="CustomSlider">
                <img src={dp2} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
          <div className="CustomSlider">
                <img src={dp3} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
            <div className="CustomSlider">
                <img src={dp1} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
          <div className="CustomSlider">
                <img src={dp2} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
          <div className="CustomSlider">
                <img src={dp3} alt="" className="w-100" />
            </div>
          </div>
          
        </Slider>
      </div>
    );
  }
}