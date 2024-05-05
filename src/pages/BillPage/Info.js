// import React, {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {Field, Form, Formik} from "formik";
// import {LoadingButton} from "../ShopManagement/LoadingButton";
// import {
//     findAllCity,
//     findAllDistrictByIdCity,
//     findAllWardsByIdDistrict
// } from "../../components/Shop/address/service/AddressService";
// import {saveBill} from "../../service/BillService";
//
// export default function Info() {
//     const [idCity, setIdCity] = useState(0)
//     const [idDistrict, setIdDistrict] = useState(0)
//     const [idWards, setIdWards] = useState(0)
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [cities, setCities] = useState([]);
//     const [districts, setDistricts] = useState([]);
//     const [wards, setWards] = useState([]);
//     const [address, setAddress] = useState("")
//     const [coords, setCoords] = useState({});
//     const [fullAddress, setFullAddress] = useState("");
//     const [nameCity, setNameCity] = useState("");
//     const [nameDistrict, setNameDistrict] = useState("");
//     const [nameWards, setNameWards] = useState("");
//     const [check, setCheck] = useState(true)
//     const [bill, setBill] = useState({})
//
//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
//             setCoords({lat: latitude, lng: longitude})
//         })
//         findAllCity().then((result) => {
//             setCities(result);
//         })
//         // const idAcc = localStorage.getItem("account")
//         // findShop(idAcc).then((res) => {
//         // })
//     }, [check])
//
//     function displayDistrictByIdCity(id) {
//         findAllDistrictByIdCity(id).then((result) => {
//             setDistricts(result);
//         })
//     }
//
//     function displayWardsByIdDistrict(id) {
//         findAllWardsByIdDistrict(id).then((result) => {
//             setWards(result)
//         })
//     }
//
//     function save(e) {
//         const idAcc = localStorage.getItem("account")
//         e = {
//             ...e,
//             id: bill.id,
//             account: {
//                 id: idAcc
//             },
//             wards: {
//                 id: idWards,
//                 district: {
//                     id: idDistrict,
//                     city: {
//                         id: idCity
//                     }
//                 }
//             }
//         }
//         saveBill(e, navigate).then(() => {
//         })
//     }
//
//
//     return (
//         <>
//             <div className={'container'} style={{width: '70%', height: "500px", marginTop: "50px"}}>
//                 <h1 style={{marginLeft: "350px"}}>Thông tin nhận hàng</h1>
//                 <div className={'row'} style={{height: "255px", border:"2px"}}>
//                     <Formik initialValues={bill}
//                             enableReinitialize={true}
//                             onSubmit={e => {
//                                 save(e)
//                             }}>
//                         <Form>
//                             <div className={'row'} style={{height: "350px", border:"solid 3px #2980b9", borderRadius: "20px", padding: "30px 20px"}}>
//                                 <div className={'col-md-6'} style={{width: '40%', marginLeft: "50px"}}>
//                                     <div className="mb-3" style={{fontSize: '16px'}}>
//                                         <label htmlFor={'name'} className="form-label">Tên khách hàng: </label>
//                                         <Field style={{fontSize: '16px'}} type={'text'} name={'name'}
//                                                className={'form-control'} id="{'name'}"/>
//                                     </div>
//                                     <div className="mb-3" style={{fontSize: '16px'}}>
//                                         <label htmlFor={'phone'} className="form-label">Số điện thoại: </label>
//                                         <Field style={{fontSize: '16px'}} type={'text'} name={'phone'}
//                                                className={'form-control'} id="{'phone'}"/>
//                                     </div>
//                                     <div className="mb-3" style={{fontSize: '16px'}}>
//                                         <label htmlFor={'address'} className="form-label">Số nhà: </label>
//                                         <Field style={{fontSize: '16px'}} type={'text'} name={'address'}
//                                                className={'form-control'}
//                                                id="{'address'}"
//                                         />
//                                     </div>
//
//                                     <div className="mb-3" style={{fontSize: '16px'}}>
//                                         <br/>
//                                         <LoadingButton loading={loading}/>
//                                     </div>
//                                 </div>
//                                 <div className={'col-md-6'} style={{width: '40%', marginLeft: '100px'}}>
//                                     <div className="mb-3" style={{fontSize: '16px'}}>
//                                         <label htmlFor={'city'} className="form-label">Thành phố</label>
//                                         <select style={{fontSize: '16px'}} name={'address.wards.district.city.id'}
//                                                 onChange={(e) => {
//                                                     const textCity = e.target.value;
//                                                     setNameCity(textCity.split("-")[1])
//                                                     displayDistrictByIdCity(textCity.split("-")[0])
//                                                     setIdCity(textCity.split("-")[0])
//                                                 }} className={"form-select"}>
//                                             {bill?.wards ? (<option >{bill?.wards?.district?.city?.name}</option>):(<option >--Chọn thành phố--</option>)}
//                                             {cities.map((c) => {
//                                                 return (
//                                                     <option value={c.id + "-" + c.name}>{c.name}</option>
//                                                 )
//                                             })}
//                                         </select>
//                                     </div>
//
//                                     <div className="mb-3" style={{fontSize: '16px'}}>
//                                         <label htmlFor={'district'} className="form-label">Quận/huyện</label>
//                                         <select style={{fontSize: '16px'}} name={'address.wards.district.id'}
//                                                 onChange={(e) => {
//                                                     const textDistrict = e.target.value;
//                                                     setNameDistrict(textDistrict.split("-")[1])
//                                                     displayWardsByIdDistrict(textDistrict.split("-")[0])
//                                                     setIdDistrict(textDistrict.split("-")[0])
//                                                 }} className={"form-select"}>
//                                             {bill?.wards ? (<option >{bill?.wards?.district?.name}</option>):(<option >--Chọn Quận/ huyện--</option>)}
//                                             {districts.map((d) => {
//                                                 return (
//                                                     <option value={d.id + "-" + d.name}>{d.name}</option>
//                                                 )
//                                             })}
//                                         </select>
//                                     </div>
//                                     <div className="mb-3" style={{fontSize: '16px'}}>
//                                         <label htmlFor={'wards'} className="form-label">Phường/xã</label>
//                                         <select style={{fontSize: '16px'}}
//
//                                                 name={'address.wards.id'} onChange={(e) => {
//                                             const textWards = e.target.value;
//                                             setNameWards(textWards.split("-")[1])
//                                             setIdWards(textWards.split("-")[0])
//                                         }} className={"form-select"}>
//                                             {bill?.wards ? (<option >{bill?.wards?.name}</option>):(<option >--Chọn xã/ phường--</option>)}
//                                             {wards.map((w) => {
//                                                 return (
//                                                     <option value={w.id + "-" + w.name}>{w.name}</option>
//                                                 )
//                                             })}
//                                         </select>
//                                     </div>
//
//
//                                 </div>
//                             </div>
//                         </Form>
//                     </Formik>
//                 </div>
//             </div>
//
//         </>
//     )
//
// }