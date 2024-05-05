import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {findAllCategory} from "./service/CategoryService";
import {findAllBrand} from "./service/BrandService";
import {storage} from "./fireBase";
import uploadImage from "./service/Upload";
import {LoadingButton} from "./LoadingButton";
import {toast} from "react-toastify";

export default function UpdateProduct() {
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let {id} = useParams()
    let [product, setProduct] = useState({})
    let [categories, setCategories] = useState([])
    let [brands, setBrands] = useState([])
    const [path, setPath] = useState([]);
    const [show, setShow] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:8080/api/products/" + id).then((res) => {
            setProduct(res.data)
        })
    }, [id])
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


    const upload = (files) => {
        uploadImage(storage, files, setPath, setLoading)
    }

    function update(product) {
        product.image = path;
        axios.post("http://localhost:8080/api/products", product)
            .then(() => {
                toast.success("Cập nhật thành công!", {autoClose: 700})
                return navigate("/shop-management/list-product")
            })
    }

    return (
        <>

            <div className={'container'} style={{width: '85%', height: "500px"}}>
                <h1 style={{textAlign: "center"}}>Thay đổi sản phẩm</h1>
                <Formik
                    initialValues={product}
                    onSubmit={(e) => {
                        update(e)
                    }}
                    enableReinitialize={true}>
                    <Form>
                        <div className={'row'} style={{height: "250px"}}>
                            <div className={'col-md-6'} style={{width: '40%'}}>
                                <div className="mb-3" style={{fontSize: '16px'}}>
                                    <label htmlFor={'name'} className="form-label">Tên</label>
                                    <Field style={{fontSize: '16px'}} type={'text'} name={'name'} className={'form-control'} id="{'name'}"/>
                                </div>
                                <div className="mb-3" style={{fontSize: '16px'}}>
                                    <label htmlFor={'price'} className="form-label">Giá</label>
                                    <Field style={{fontSize: '16px'}} type={'number'} name={'price'} className={'form-control'} id="{'price'}"/>
                                </div>
                                <div className="mb-3" style={{fontSize: '16px'}}>
                                    <label htmlFor={'quantity'} className="form-label">Số lượng</label>
                                    <Field style={{fontSize: '16px'}} type={'number'} name={'quantity'} className={'form-control'}
                                           id="{'quantity'}"/>
                                </div>
                                <div className="mb-3" style={{fontSize: '16px'}}>
                                    <label htmlFor={'description'} className="form-label">Mô tả</label>
                                    <Field style={{fontSize: '16px'}} type={'text'} name={'description'} className={'form-control'}
                                           id="{'description'}"/>
                                </div>
                                <div className="mb-3" style={{fontSize: '16px'}}>
                                    <br/>
                                    <LoadingButton loading={loading}/>
                                </div>
                            </div>
                            <div className={'col-md-6'} style={{width: '40%', marginLeft: '100px'}}>
                                <div className="mb-3" style={{fontSize: '16px'}}>
                                    <label htmlFor={'image'} className="form-label">Image</label>
                                    <input style={{fontSize: '16px'}} type={'file'} multiple name={"image"} className={'form-control'}
                                           id="{'image'}"
                                           onChange={(e) => {
                                               upload(e.target.files)
                                           }}/>
                                </div>
                                <div>
                                    <label htmlFor={'category'} className="form-label" style={{fontSize: '16px'}}>Chọn loại mặt hàng</label>
                                    <Field as="select" name="category.id" class="form-control" style={{fontSize: '16px'}}>
                                        <option>--Chọn loại--</option>
                                        {categories.map((d) => {
                                            return (
                                                <option value={d.id}>{d.name}</option>
                                            )
                                        })}
                                    </Field>
                                </div>
                                <div>
                                    <label htmlFor={'brand'} className="form-label" style={{fontSize: '16px', marginTop: '9px'}}>Chọn thương hiệu</label>
                                    <Field as="select" name="brand.id" class="form-control" style={{fontSize: '16px'}}>
                                        <option>--Chọn thương hiệu--</option>
                                        {brands.map((d) => {
                                            return (
                                                <option value={d.id}>{d.name}</option>
                                            )
                                        })}
                                    </Field>
                                </div>
                                <div className="mb-3" style={{fontSize: '16px',marginTop:'10px'}}>
                                    <label htmlFor={'promotion'} className="form-label">Phần trăm giảm giá</label>
                                    <Field style={{fontSize: '16px'}} type={'text'} name={'promotion'}
                                           className={'form-control'}
                                           id="{'promotion'}"/>
                                </div>
                            </div>
                            {/*<br/>*/}
                            {/*<br/>*/}
                            {/*<div style={{textAlign: "center"}}>*/}
                            {/*    <button className={'btn btn-primary'} type={'submit'} style={{fontSize: '16px'}}>Sửa</button>*/}
                            {/*</div>*/}
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}