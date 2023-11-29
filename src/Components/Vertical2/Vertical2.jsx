import React, { Component } from "react";
import Slider from "react-slick";
import "./Vartical.css"

export default class VerticalSwipeToSlide extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
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
      <div className="foi2">
        <Slider {...settings} className="fop m-0 "  style={{with:"58%"}} >
          <div className="">
            <a href="" className="ankUppr">
            <p className="perStry">Nur Brancaccio v J Cristian</p>
            <p className="perStry">06/09/2023 23:00:00 (UTC+05:00)</p>
            </a>
          </div>
          <div className="">
            <a href="" className="ankUppr">
            <p className="perStry">Twente (W) v Sturm Graz (W)</p>
            <p className="perStry">06/09/2023 22:00:00 (UTC+05:00)</p>
            </a>
          </div>
          <div className="">
            <a href="" className="ankUppr">
            <p className="perStry">Joh Monday v J De Jong</p>
            <p className="perStry">06/09/2023 15:00:00 (UTC+05:00)</p>
            </a>
          </div>
          
        </Slider>
      </div>
    );
  }
}