import React, { useEffect, useState } from "react";
import { findAllCategory } from "../ShopManagement/service/CategoryService";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { findAllCity } from "../../components/Shop/address/service/AddressService";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import ProductList from "../../components/ProductList/ProductList";
import Slider from "@mui/material/Slider";
import { formatPrice } from "../../utils/helpers";
import { findAllBrand } from "../ShopManagement/service/BrandService";
import Select from 'react-select'
import Checkbox from "@mui/material/Checkbox";
import "./Filter.css";


export default function Filter() {
    let [categories, setCategories] = useState([]);
    let [brands, setBrands] = useState([]);
    const [cities, setCities] = useState([]);
    const [range, setRange] = useState([0, 50000000]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState({
        maxPrice: range[1],
        minPrice: range[0],
        category: {
            id: ""
        },
        brand: {
            id: ""
        },
        wards: {
            id: null
        },
        district: {
            id: null
        },
        city: {
            id: ""
        }
    });

    useEffect(() => {
        findAllCity().then((result) => {
            setCities(result);
        });
    }, []);

    useEffect(() => {
        findAllCategory().then(res => {
            setCategories(res);
        });
    }, []);

    useEffect(() => {
        findAllBrand().then(res => {
            setBrands(res);
        });
    }, []);

    function handleChanges(event) {
        setRange(event.target.value);
        setSearch({
            ...search,
            maxPrice: event.target.value[1],
            minPrice: event.target.value[0]
        });
    }

    function filter(filter) {
        axios.post("http://localhost:8080/api/filters", filter).then(res => {
            setProducts(res.data);
        });
    }

    const brandsOptions = brands.map((brand) => ({
        value: brand.id,
        label: brand.name
    }));
    const categoriesOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }));
    const citiesOptions = cities.map((city) => ({
        value: city.id,
        label: city.name
    }));

    const getBrand = (e) => {
        setSearch({
            ...search,
            brand: {
                id: e?.value || ""
            }
        });
        setSelectedCategory(e);
    }

    const getCategory = (e) => {
        setSearch({
            ...search,
            category: {
                id: e?.value || ""
            }
        });
        setSelectedCategory(e);
    }

    const getCity = (e) => {
        setSearch({
            ...search,
            city: {
                id: e?.value || ""
            }
        });
        setSelectedCategory(e);
    }

    return (
        <>
            <Formik
                initialValues={search}
                onSubmit={(e) => filter(e)}
                enableReinitialize={true}
            >
                <Form>
                    <div className="filter-container">
                        <div className="price-range">
                            <label className="form-label">Giá</label>
                            <div className="slider-container">
                                <Slider
                                    value={range}
                                    onChange={(e) => handleChanges(e)}
                                    min={0}
                                    max={50000000}
                                    step={100000}
                                />
                                <div className="price-labels">
                                    <span>{formatPrice(range[0])}</span>
                                    <span>{formatPrice(range[1])}</span>
                                </div>
                            </div>
                        </div>
                        <div className="filter-select">
                            <div className="form-group">
                                <label htmlFor={'category'} className="form-label">Mặt hàng</label>
                                <Select
                                    placeholder={"Chọn mặt hàng"}
                                    onChange={(e) => getCategory(e)}
                                    options={categoriesOptions}
                                    isSearchable={true}
                                    name="category.id"
                                    isClearable={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={'brand'} className="form-label">Thương hiệu</label>
                                <Select
                                    placeholder={"Chọn thương hiệu"}
                                    onChange={(e) => getBrand(e)}
                                    options={brandsOptions}
                                    isSearchable={true}
                                    name="brand.id"
                                    isClearable={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={'city'} className="form-label">Khu vực</label>
                                <Select
                                    placeholder={"Chọn thành phố"}
                                    onChange={(e) => getCity(e)}
                                    options={citiesOptions}
                                    isSearchable={true}
                                    name="city.id"
                                    isClearable={true}
                                />
                            </div>
                        </div>
                        <button className="submit-btn" type="submit">Tìm kiếm</button>
                    </div>
                </Form>
            </Formik>
            <div>
                {products === STATUS.LOADING ? <Loader /> : (products === null ? ""
                    : (products.length === 0 ?
                        <div className='categories-item'>
                            <div className='title-md'>
                                <h3>KẾT QUẢ TÌM KIẾM </h3>
                            </div>
                            <br />
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/006/208/684/small/search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" alt="No results found" />
                            <br />
                            <h3>Không có sản phẩm phù hợp tiêu chí tìm kiếm</h3>
                        </div>
                        :
                        <div className='categories-item'>
                            <div className='title-md'>
                                <h3>KẾT QUẢ TÌM KIẾM </h3>
                            </div>
                            <br />
                            <ProductList products={products} />
                        </div>))}
            </div>
        </>
    )
}
