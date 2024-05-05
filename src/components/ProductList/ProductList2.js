import React from 'react';
import "./ProductList.scss";
import Product from "../Product/Product";
import Slider from "react-slick";
import ProductSlide from "../Product/ProductSlide";

const ProductList2 = ({products}) => {
    let settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 2500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextButton: <SampleNextArrow />,
        prevBaseLine: <SamplePrevArrow />
    };

    function SampleNextArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "block", backgroundColor: "black ",position:"absolute",marginRight:'4px'}}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "block", background: "green",marginLeft:'5px',position:"absolute",}}
                onClick={onClick}
            />
        );
    }

    return (

        <div className='product-lists'>
            <div className={"container"} style={{}}>

                <Slider {...settings}>
                    {products.map(product => {
                        let discountedPrice = (product.price) - (product.price * (product.promotion / 100));
                        return (

                            <div style={{margin: 'auto'}}>
                                <ProductSlide key={product.id} product={{...product, discountedPrice}}/>
                            </div>


                        )
                    })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default ProductList2