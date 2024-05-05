import React, {useEffect, useState} from 'react';
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import ProductList from "../../components/ProductList/ProductList";
import Loader from "../../components/Loader/Loader";
import {STATUS} from '../../utils/status';
import {displayAllCategory, displayProductStatus} from "../../service/ProductService";
import Filter from "./Filter";
import ListPrd from "../../components/ProductList/ListPrd";
import ProductList2 from "../../components/ProductList/ProductList2";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        displayProductStatus().then((res) => {
            setProducts(res.data);

        })
        displayAllCategory().then((res) => {
            setCategories(res.data);

        })
    }, []);
    // randomizing the products in the list
    const tempProducts = [];
    if (products.length > 0) {
        for (let i in products) {
            let randomIndex = Math.floor(Math.random() * products.length);

            while (tempProducts.includes(products[randomIndex])) {
                randomIndex = Math.floor(Math.random() * products.length);
            }
            tempProducts[i] = products[randomIndex];
            if (tempProducts.length >= 10) {
                break
            }
        }
    }
    const productByCategory = new Array(categories.length).fill(0);
    if (products.length > 0) {
        for (let i = 0; i < categories.length; i++) {
            let product = [];
            for (let j = 0; j < products.length; j++) {
                if (products[j]?.category?.name === categories[i].name) {
                    product.push(products[j])
                }
            }
            productByCategory[i] = product;
        }
    }
    return (
        <main>
            <div className='slider-wrapper'>
                <HeaderSlider/>
            </div>
            <div className='main-content bg-whitesmoke'>
                <div className='containerr'>
                    <div>
                        <Filter/>
                    </div>

                    <div className='categories py-5'>
                        <div className='categories-item'>
                            <div className='title-md'>
                                <h3>GỢI Ý HÔM NAY </h3>

                            </div>
                            {products === STATUS.LOADING ? <Loader/> : <ProductList2 products={tempProducts}/>}
                        </div>
                        {categories.map((item) => (
                            // (item.length > 0) ?
                                <div className='categories-item'>
                                    <div className='title-md'>
                                        <h3>{item?.name}</h3>
                                    </div>
                                    {item === STATUS.LOADING ? <Loader/> : <ListPrd categories={item?.id}/>}

                                </div>
                                // :
                                // <div></div>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    )
}

export default HomePage