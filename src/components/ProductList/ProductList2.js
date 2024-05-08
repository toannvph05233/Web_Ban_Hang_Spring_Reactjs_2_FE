import React from 'react';
import "./ProductList.scss";
import ProductSlide from "../Product/ProductSlide";
import Slider from "react-slick";

const ProductList2 = ({ products }) => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 2500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", backgroundColor: "black", position: "absolute", right: '-20px', zIndex: 1 }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", backgroundColor: "black", position: "absolute", left: '-20px', zIndex: 1 }}
                onClick={onClick}
            />
        );
    }

    return (
        <div className='product-lists'>
            <div className={"container"}>
                <Slider {...settings}>
                    {products.map(product => {
                        let discountedPrice = (product.price) - (product.price * (product.promotion / 100));
                        return (
                            <div key={product.id}>
                                <ProductSlide product={{ ...product, discountedPrice }} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}

export default ProductList2;
