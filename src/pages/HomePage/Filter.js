import React, {useEffect, useState} from "react";
import {findAllCategory} from "../ShopManagement/service/CategoryService";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {
    findAllCity,
} from "../../components/Shop/address/service/AddressService";
import {STATUS} from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import ProductList from "../../components/ProductList/ProductList";
import Slider from "@mui/material/Slider";
import {formatPrice} from "../../utils/helpers";
import {findAllBrand} from "../ShopManagement/service/BrandService";
import Select from 'react-select'
import Checkbox from "@mui/material/Checkbox";


export default function Filter() {

    let [categories, setCategories] = useState([])
    let [brands, setBrands] = useState([])
    const [isClearable, setIsClearable] = useState(true);

    let [products, setProducts] = useState(null);
    const [cities, setCities] = useState([]);
    const [range, setRange] = React.useState([0, 50000000]);
    const [selectedCategory, setSelectedCategory] = useState(null);


    let [search, setSearch] = useState({
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
    })


    useEffect(() => {
        findAllCity().then((result) => {
            setCities(result);
        })
    }, [])

    useEffect(() => {
            findAllCategory().then(res => {
                setCategories(res)
            })
        }, []
    )
    useEffect(() => {
            findAllBrand().then(res => {
                setBrands(res)
            })
        }, []
    )

    function handleChanges(event) {
        setRange(event.target.value)
        setSearch({
            ...search, maxPrice: event.target.value[1], minPrice: event.target.value[0]
        })
    }

    function filter(filter) {
        axios.post("http://localhost:8080/api/filters", filter).then(res => {
            setProducts(res.data)
        })
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
        if (e && e.value) {
            setSearch({
                ...search, brand: {
                    id: e.value
                }
            })
            setSelectedCategory(e);
        } else {
            setSearch({
                ...search, brand: {
                    id: null
                }
            });
            setSelectedCategory(null);
        }
    }
    const getCategory = (e) => {
        if (e && e.value) {
            setSearch({
                ...search,
                category: {
                    id: e.value
                }
            });
            setSelectedCategory(e);
        } else {
            setSearch({
                ...search,
                category: {
                    id: null
                }
            });
            setSelectedCategory(null);
        }
    }

    const getCity = (e) => {
        if (e && e.value) {
            setSearch({
                ...search, city: {
                    id: e.value
                }
            });
            setSelectedCategory(e);
        } else {
            setSearch({
                ...search, city: {
                    id: null
                }
            });
            setSelectedCategory(null);
        }
    }
    return (
        <>
            <Formik
                initialValues={search}
                onSubmit={(e) => {
                    filter(e)
                }}
                enableReinitialize={true}>
                <Form>
                    <div style={{display: 'flex'}}>
                        <div style={{width: "410px", fontSize: "16px", marginLeft: '40px', marginTop: '20px'}}>
                            Từ {formatPrice(range[0])} đến {formatPrice(range[1])}
                            <Slider style={{color: "rgb(215, 0, 24)", fontSize: "5px", marginTop: '10px'}} value={range}
                                    onChange={(e) => handleChanges(e)} valueLabelDisplay="auto"
                                    min={0}
                                    max={50000000}
                                    step={100000}/>


                        </div>
                        <div style={{fontSize: '16px',marginLeft: '15px', width: "20%"}}>
                            <div className={'col-md-6'} style={{ marginTop: "18px"}}>
                                <label htmlFor={'category'} className="form-label">Mặt hàng</label>
                                <div style={{fontSize: '16px', width: '220px'}}>
                                    <Select placeholder={"Chọn mặt hàng"} onChange={(e) => {
                                        getCategory(e)
                                    }}
                                            options={categoriesOptions}
                                            isSearchable={true}
                                            name="category.id"
                                            isClearable={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginLeft: '20px',fontSize: '16px', width: "20%"}}>
                            <div className={'col-md-6'} style={{marginLeft: '0px', marginTop: "18px"}}>
                                <label htmlFor={'brand'} className="form-label">Thương hiệu</label>
                                <div style={{fontSize: '16px', width: '220px'}}>
                                    <Select placeholder={"Chọn thương hiệu"} onChange={(e) => {
                                        getBrand(e)
                                    }}
                                            options={brandsOptions}
                                            isSearchable={true}
                                            name="brand.id"
                                            isClearable={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={'col-md-6'} style={{width: '15%', marginLeft: '120px', marginTop: "18px"}}>
                            <div className="mb-3" style={{fontSize: '16px', marginLeft: '-100px'}}>
                                <label htmlFor={'city'} className="form-label">Khu vực</label>
                                <div style={{fontSize: '16px', width: '220px'}}>
                                    <Select placeholder={"Chọn thành phố"} onChange={(e) => {
                                        getCity(e)
                                    }}
                                            options={citiesOptions}
                                            isSearchable={true}
                                            name="city.id"
                                            isClearable={true}
                                    />
                                </div>

                            </div>
                        </div>
                        <button className={"mb-3"} type={'submit'}
                                style={{
                                    fontSize: '16px',
                                    marginTop: '47px',
                                    background: 'rgb(215, 0, 24)',
                                    marginRight: '40px',
                                    width: '15%',
                                    height: '42px',
                                    color: 'white'
                                }}>
                            Tìm kiếm
                        </button>
                    </div>
                </Form>
            </Formik>
            <div>
                {products === STATUS.LOADING ? <Loader/> : (products === null ? ""
                    : (products.length === 0 ?
                        <div className='categories-item'>
                            <div className='title-md'>
                                <h3>KẾT QUẢ TÌM KIẾM </h3>
                            </div>
                            <br/>
                            <img style={{height: '150px', width: '150px', marginLeft: '550px'}}
                                 src="https://static.vecteezy.com/system/resources/thumbnails/006/208/684/small/search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                                 alt=""/>
                            <br/>
                            <h3 style={{textAlign: 'center'}}>Không có sản phẩm phù hợp tiêu chí tìm kiếm</h3>

                        </div>
                        :
                        <div className='categories-item'>
                            <div className='title-md'>
                                <h3>KẾT QUẢ TÌM KIẾM </h3>
                            </div>
                            <br/>
                            <ProductList products={products}/>
                        </div>))}
            </div>
        </>


    )
}