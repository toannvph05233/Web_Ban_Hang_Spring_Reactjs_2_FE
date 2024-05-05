import React, {useContext, useEffect, useState} from "react";
import {
    findAllCity,
    findAllDistrictByIdCity,
    findAllWardsByIdDistrict
} from "../../components/Shop/address/service/AddressService";
import {useNavigate} from "react-router-dom";
import {findUserByAccount, saveUser} from "./Service/UserService";
import {storage} from "../ShopManagement/fireBase";
import {Field, Form, Formik} from "formik";
import {LoadingButton} from "../ShopManagement/LoadingButton";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {AppContext} from "../../Context/AppContext";
import {toast} from "react-toastify";

export default function ProfileUser() {
    const [idCity, setIdCity] = useState(0)
    const [idDistrict, setIdDistrict] = useState(0)
    const [idWards, setIdWards] = useState(0)
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [user, setUser] = useState({});
    const [check, setCheck] = useState(true)
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isFlag, toggleFlag} = useContext(AppContext);


    useEffect(() => {
        findAllCity().then((res) => {
            setCities(res)
        })
        const idAcc = localStorage.getItem("account")
        findUserByAccount(idAcc).then((res) => {
            setUser(res)
            if (res.wards === null) {
                findAllDistrictByIdCity(1).then((result) => {
                    setDistricts(result);
                    findAllWardsByIdDistrict(result[0].id).then((result) => {
                        setWards(result)
                    })
                })
            } else {
                displayDistrictByIdCity(res.wards?.district?.city?.id)
                displayWardsByIdDistrict(res.wards?.district?.id)
            }
        })
    }, [check, isFlag]);

    function displayDistrictByIdCity(id) {
        findAllDistrictByIdCity(id).then((result) => {
            setDistricts(result);
        })
    }

    function displayWardsByIdDistrict(id) {
        findAllWardsByIdDistrict(id).then((result) => {
            setWards(result)
        })
    }

    const handledImage = (file) => {
        if (file === null) return;
        const imageRef = ref(storage, `image/${file.name + v4()}`)
        setLoading(true);
        uploadBytes(imageRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(url => {
                setAvatar(url)
                setLoading(false);
            })
        })
    }

    function save(e) {
        const idAcc = localStorage.getItem("account")

        e = {
            ...e,
            avatar: avatar,
            account: {
                id: idAcc
            },
            wards: {
                id: idWards,
                district: {
                    id: idDistrict,
                    city: {
                        id: idCity
                    }
                }
            }
        }
        console.log(e)
        saveUser(e, navigate).then(() => {
            toast.success("Lưu thành công!")
            toggleFlag()
            setCheck(true)
        })
    }

    const defaultImageUrl = "https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg";

    return (
        <>
            <div className={'container'} style={{width: '85%', height: "500px"}}>
                <div className={'row'} style={{height: "200px"}}>
                    <div className="col-md-4" style={{marginBottom: '40px', position: 'relative'}}>
                        <img style={{
                            width: '200px', height: '200px', borderRadius: '50%',
                            border: '3px solid #ddd', boxShadow: '0px 0px 10px #aaa'
                        }}
                             src={user?.avatar || defaultImageUrl}
                             alt="Avatar"
                             onClick={() => document.getElementById('imageUpload').click()}
                        />
                        <input type="file" id="imageUpload" style={{display: 'none'}}
                               onChange={(e) => handledImage(e.target.files[0])}/>

                    </div>
                    <div className={'col-md-2'}></div>
                    <div className={'col-md-5'}>

                        <div className="mb-2" style={{fontSize: '16px'}}>
                            <label htmlFor={'city'} className="form-label">Thành phố</label>
                            <select style={{fontSize: '16px'}} disabled={check} onChange={(e) => {
                                const textCity = e.target.value;
                                displayDistrictByIdCity(textCity.split("-")[0])
                                setIdCity(textCity.split("-")[0])
                            }} className={"form-select"}>
                                {/*{user?.wards ? (<option >{user?.wards?.district?.city?.name}</option>):(<option >--Chọn thành phố--</option>)}*/}
                                {cities.map((c) => {
                                    return (
                                        <option key={c.id} value={c.id + "-" + c.name}>{c.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3" style={{fontSize: '16px'}}>
                            <label htmlFor={'district'} className="form-label">Quận/huyện</label>
                            <select style={{fontSize: '16px'}} disabled={check} onChange={(e) => {
                                const textDistrict = e.target.value;
                                displayWardsByIdDistrict(textDistrict.split("-")[0])
                                setIdDistrict(textDistrict.split("-")[0])
                            }} className={"form-select"}>
                                {/*{user?.wards ? (<option>{user?.wards?.district?.name}</option>):(<option>--Chọn Quận/Huyện--</option>)}*/}
                                {districts.map((d) => {
                                    return (
                                        <option key={d.id} value={d.id + "-" + d.name}>{d.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3" style={{fontSize: '16px'}}>
                            <label htmlFor={'wards'} className="form-label">Phường/xã</label>
                            <select style={{fontSize: '16px'}} disabled={check} onChange={(e) => {
                                const textWards = e.target.value;
                                setIdWards(textWards.split("-")[0])
                            }} className={"form-select"}>
                                {/*{user?.wards ? ( <option >{user?.wards?.name}</option>):(<option >--Chọn xã/phường--</option>)}*/}
                                {wards.map((w) => {
                                    return (
                                        <option key={w.id} value={w.id + "-" + w.name}>{w.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={'row'} style={{height: "250px", marginTop: '30px'}}>
                    <Formik initialValues={user}
                            enableReinitialize={true}
                            onSubmit={e => {
                                save(e)
                            }}>
                        <Form>
                            <div className={'row'} style={{height: "250px"}}>
                                <div className={'col-md-6'} style={{width: '40%'}}>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'name'} className="form-label">Tên user: </label>
                                        <Field style={{fontSize: '16px'}} disabled={check} type={'text'} name={'name'}
                                               className={'form-control'} id="{'name'}"/>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'phone'} className="form-label">Số điện thoại: </label>
                                        <Field style={{fontSize: '16px'}} disabled={check} type={'text'} name={'phone'}
                                               className={'form-control'} id="{'phone'}"/>
                                    </div>

                                    <div style={{
                                        fontSize: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        minWidth: '600px',
                                        textAlign: 'center',
                                        marginLeft: '83%',
                                        marginTop: '10%'
                                    }}>
                                        <button type={'button'} className={'btn '}
                                                style={{fontSize: '14px', marginRight: '10px'}} onClick={() => {
                                            setCheck(!check)
                                        }}
                                        > Cập nhật <i className="fa-sharp fa-regular fa-pen-to-square"
                                                        style={{color: '#b61b1b'}}></i></button>
                                        <LoadingButton loading={loading}/>
                                    </div>
                                </div>
                                <div className={'col-md-6'} style={{width: '42%', marginLeft: '100px'}}>


                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'address'} className="form-label">Số nhà: </label>
                                        <Field style={{fontSize: '16px'}} disabled={check} type={'text'}
                                               name={'address'} className={'form-control'}
                                               id="{'address'}"
                                        />
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'age'} className="form-label">Ngày sinh: </label>
                                        <Field style={{fontSize: '16px'}} disabled={check} type={'date'} name={'age'}
                                               className={'form-control'}
                                               id="{'age'}"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>

            </div>
        </>
    )
}