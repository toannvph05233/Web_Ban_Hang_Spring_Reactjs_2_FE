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
              <img src = "https://toanphatcorp.vn/media/images/tin-tuc/xu-huong-dat-do-an-online-1.jpg" alt = "" />
            </div>
            <div className='slider-item'>
              <img src = "https://ipos.vn/wp-content/uploads/2022/10/Cac-ung-dung-dat-do-an-online.jpg" alt = "" />
            </div>

          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HeaderSlider
