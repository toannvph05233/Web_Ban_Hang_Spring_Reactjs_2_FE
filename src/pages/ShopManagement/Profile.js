import React, {useContext, useEffect, useState} from "react";
import {
    findAllCity,
    findAllDistrictByIdCity,
    findAllWardsByIdDistrict
} from "../../components/Shop/address/service/AddressService";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "./fireBase";
import {v4} from "uuid";
import {Field, Form, Formik} from "formik";
import {LoadingButton} from "./LoadingButton";
import {findShop, saveShop} from "./service/ProfileService";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../Context/AppContext";
import {toast} from "react-toastify";
import {findUserByAccount} from "../UserManagement/Service/UserService";


export default function Profile() {
    const [idCity, setIdCity] = useState(1)
    const [idDistrict, setIdDistrict] = useState(1)
    const [idWards, setIdWards] = useState(1)
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [address, setAddress] = useState("")
    const [coords, setCoords] = useState({});
    const [fullAddress, setFullAddress] = useState("");
    const [nameCity, setNameCity] = useState("");
    const [nameDistrict, setNameDistrict] = useState("");
    const [nameWards, setNameWards] = useState("");
    const [shop, setShop] = useState({});
    const [check, setCheck] = useState(true)
    const {toggleFlag} = useContext(AppContext);
    const [showCity,setShowCity] = useState(false)
    const Icon = ({text}) => <div>{text}</div>;


    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        //     setCoords({lat: latitude, lng: longitude})
        // })
        findAllCity().then((result) => {
            setCities(result);
        })
        const idAcc = localStorage.getItem("account")
        findShop(idAcc).then((res) => {
            if(res){
                setShop(res)
            }
            if (res.wards === undefined) {
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
    }, [])





    const find = async () => {
        setFullAddress(nameWards + ", " + nameDistrict + ", " + nameCity)
        console.log('address in find ', address + ", " + nameWards + ", " +nameDistrict + ", " + nameCity);
        // const result = await geocodeByAddress(fullAddress)
        const result = await geocodeByAddress('Bến xe Mỹ Đình')
        const latLng = await getLatLng(result[0])
        setCoords(latLng)
    }

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
        setAddress(e.address)
        const idAcc = localStorage.getItem("account")
        const request = {
            ...e,
            id: shop.id,
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

        console.log("request")
        console.log("request")
        console.log("request")
        console.log(request)
        saveShop(request, navigate).then(async () => {
            toast.success("Lưu thành công!")
            setCheck(true)
            toggleFlag()
            // find().then()
        }).catch( () => {
            toast.warning("Lưu thất bại !")
        })
    }
const defaultImageUrl = "https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg";

    function onWardChange(e) {
        setIdWards(e.target.value);
        const ward = wards.find(w => w.id === +e.target.value);
        setNameWards(ward.name);
    }



    return (
        <>
            <div className={'container'} style={{width: '85%', height: "500px"}}>
                <div className={'row'} style={{height: "200px"}}>
                    <div className="col-md-4" style={{marginBottom: '40px', position: 'relative' }}>
                        <img style={{
                            width: '200px', height: '200px', borderRadius: '50%',
                            border: '3px solid #ddd', boxShadow: '0px 0px 10px #aaa'
                        }}
                             src={shop.avatar || defaultImageUrl }
                             alt="Avatar"
                             onClick={()=>document.getElementById('imageUpload').click()}
                        />

                        <input type="file" id="imageUpload" style={{display: 'none'}}
                               onChange={(e) => handledImage(e.target.files[0])}/>
                    </div>
                    {/*<div className={'col-md-2'}>*/}
                    {/*    <div style={{color: "red", scale: "2"}}>{nameCity}</div>*/}
                        {/*<div style={{width: "500px", height: "200px", marginLeft:"55px"}}>*/}
                        {/*    <GoogleMapReact*/}
                        {/*        bootstrapURLKeys={{key: 'AIzaSyDRqtWVwZAl8sB2Au23S10L_V5GgC_3Cls'}}*/}
                        {/*        defaultCenter={coords}*/}
                        {/*        defaultZoom={15}*/}
                        {/*        center={coords}*/}
                        {/*    >*/}
                        {/*        <Icon*/}
                        {/*            lat={coords.lat}*/}
                        {/*            lng={coords.lng}*/}
                        {/*            text={<IoLocationSharp color={"red"} size={25}/>}*/}
                        {/*        />*/}
                        {/*    </GoogleMapReact>*/}

                        {/*</div>*/}

                    {/*</div>*/}
                    <div className={'col-md-6'}>

                    </div>
                </div>
                <div className={'row'} style={{height: "250px"}}>
                    <Formik initialValues={shop}
                    enableReinitialize={true}
                            onSubmit={(e) => {
                                save(e)
                            }}>
                        <Form>
                            <div className={'row'} style={{ height: "250px" }}>
                                <div className={'col-md-6'} style={{ width: '40%' }}>
                                    <div className="mb-3" style={{ fontSize: '16px' }}>
                                        <label htmlFor={'name'} className="form-label">Tên shop: </label>
                                        <Field style={{ fontSize: '16px' }} disabled={check} type={'text'} name={'name'} className={'form-control'} id="{'name'}" />
                                    </div>
                                    <div className="mb-3" style={{ fontSize: '16px' }}>
                                        <label htmlFor={'phone'} className="form-label">Số điện thoại: </label>
                                        <Field style={{ fontSize: '16px' }} disabled={check} type={'text'} name={'phone'} className={'form-control'} id="{'phone'}" />
                                    </div>
                                    <div className="mb-3" style={{ fontSize: '16px' }}>
                                        <label htmlFor={'address'} className="form-label">Số nhà: </label>
                                        <Field style={{ fontSize: '16px' }} disabled={check} type={'text'} name={'address'} className={'form-control'} id="{'phone'}" />
                                    </div>

                                    <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', minWidth: '600px', textAlign: 'center', marginLeft: '83%', marginTop: '10%' }}>
                                        <button type={'button'} className={'btn '} style={{ fontSize: '14px', marginRight: '10px' }} onClick={() => {
                                            setCheck(!check)
                                        }}
                                        > Cập nhật <i className="fa-sharp fa-regular fa-pen-to-square" style={{ color: '#b61b1b' }}></i></button>
                                        <LoadingButton loading={loading} />
                                    </div>
                                </div>
                                <div className={'col-md-6'} style={{ width: '40%', marginLeft: '100px' }}>
                                    <div className="mb-3" style={{ fontSize: '16px' }}>
                                        <label htmlFor={'city'} className="form-label">Thành phố</label>
                                        <select style={{ fontSize: '16px' }} disabled={check} name={'address.wards.district.city.id'} onChange={(e) => {
                                            const textCity = e.target.value;
                                            setNameCity(textCity.split("-")[1])
                                            displayDistrictByIdCity(textCity.split("-")[0])
                                            setIdCity(textCity.split("-")[0])
                                        }} className={"form-select"}>
                                            {cities.map((c) => {
                                                return (
                                                    <option value={c.id + "-" + c.name}>{c.name}</option>
                                                )
                                            })}
                                        </select>
                                        <Field type="hidden" name="address.wards.district.city.id" value={idCity} />
                                    </div>

                                    <div className="mb-3" style={{ fontSize: '16px' }}>
                                        <label htmlFor={'district'} className="form-label">Quận/huyện</label>
                                        <select style={{ fontSize: '16px' }} disabled={check} name={'address.wards.district.id'} onChange={(e) => {
                                            const textDistrict = e.target.value;
                                            setNameDistrict(textDistrict.split("-")[1])
                                            displayWardsByIdDistrict(textDistrict.split("-")[0])
                                            setIdDistrict(textDistrict.split("-")[0])
                                        }} className={"form-select"}>
                                            {districts.map((d) => {
                                                return (
                                                    <option value={d.id + "-" + d.name}>{d.name}</option>
                                                )
                                            })}
                                        </select>
                                        <Field type="hidden" name="address.wards.district.id" value={idDistrict} />
                                    </div>
                                    <div className="mb-3" style={{ fontSize: '16px' }}>
                                        <label htmlFor={'wards'} className="form-label">Phường/xã</label>
                                        <select style={{ fontSize: '16px' }} disabled={check} name={'address.wards.id'} onChange={(e) => onWardChange(e)} className={"form-select"}>
                                            {wards.map((w) => {
                                                return (
                                                    <option value={w.id}>{w.name}</option>
                                                )
                                            })}
                                        </select>
                                        <Field type="hidden" name="address.wards.id" value={idWards} />
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
