import React from 'react';
import {Link} from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import "./Product.scss";

const ProductSlide = ({product}) => {
    return (

        <Link to={`/product/${product?.id}`} key={product?.id}>
            <div className='product-item bg-white' style={{margin: '8px'}}>
                <div className='category'>- {product?.promotion} %</div>
                <div className='product-item-img'>
                    <img className='img-cover' src={product?.image[0]?.name} alt={product.name}
                         style={{width: '200px', height: '200px', marginLeft: '16px', marginTop: '40px'}}/>
                </div>
                <div className='product-item-info fs-14'>
                    {/*<div className='brand'>*/}
                    {/*  <span></span>*/}
                    {/*  <span className='fw-7'>{product?.brand?.name}</span>*/}
                    {/*</div>*/}
                    <div className='nameP' >
                        {product?.name}
                    </div>
                    <div className=''>
                        <div>
                            {/*   <span className='old-price'>*/}
                            {/*  {formatPrice(product?.price)}*/}
                            {/*</span>*/}
                            <span className='discount fw-6' style={{fontSize: '20px', color: 'red'}}>
                            {formatPrice(product?.price / 100 * (100 - product?.promotion))}
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <div>
                                <span>Đánh giá : 1</span>
                            </div>
                            <div style={{}}>
                            <span style={{marginLeft: '50px'}}>
                            Đã bán : {formatNumberToK(product?.count)}
                                </span>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </Link>
    )

    function formatNumberToK(number) {
        if (number >= 1000000) {
            const result = number / 1000000;
            return result % 1 === 0 ? result.toFixed(0) + 'M' : result.toFixed(1) + 'M';
        } else if (number >= 1000) {
            const result = number / 1000;
            return result % 1 === 0 ? result.toFixed(0) + 'k' : result.toFixed(1) + 'k';
        } else {
            return number.toString();
        }
    }

}

export default ProductSlide