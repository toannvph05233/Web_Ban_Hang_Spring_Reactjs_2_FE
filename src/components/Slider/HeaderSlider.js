import React from 'react';
import "./HeaderSlider.scss";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='slider'>
      <div className='containerr'>
        <div className='slider-content overflow-x-hidden'>
          <Slider {...settings}>
            <div className='slider-item'>
              <img src = "https://firebasestorage.googleapis.com/v0/b/students-2950f.appspot.com/o/image%2Fslide.png?alt=media&token=5306a9a2-d7e0-4940-95b4-9a67bf1b6b62" alt = "" />
            </div>
            <div className='slider-item'>
              <img src = "https://firebasestorage.googleapis.com/v0/b/students-2950f.appspot.com/o/image%2Fslide3.png?alt=media&token=9d074151-263b-40fb-b5bd-d4a7923dff16" alt = "" />
            </div>

          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HeaderSlider