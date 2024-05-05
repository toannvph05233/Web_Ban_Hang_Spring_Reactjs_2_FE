import React, {useEffect, useState} from 'react';
import "./BillCancel.scss";
import {shopping_cart} from '../../utils/images';
import {Link} from 'react-router-dom';
import {formatPrice} from '../../utils/helpers';
import {showBillByAccountAndStatus} from "../../service/BillService";
import {findUserByAccount} from "../../pages/UserManagement/Service/UserService";
import {CiShop} from "react-icons/ci";
import {BsArrowThroughHeart} from "react-icons/bs";
import {IoLocationOutline} from "react-icons/io5";


const CancelUser = () => {
    const idAccount = localStorage.getItem("account")
    const [bills, setBills] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [user, setUser] = useState({})
    const status = "Đơn hủy"
    const [bill1, setBill1] = useState([])
    const [listBillByBillDetail, setListBillByBillDetail] = useState([])


    useEffect(() => {
        showBillByAccountAndStatus(idAccount, status).then((response) => {
            setBills(response)
            const checkBill = [];
            response.forEach((billDetail) => {
                if (!checkBill.includes(billDetail.bill.id)) {
                    checkBill.push(billDetail.bill.id);
                }
            });
            setBill1(checkBill);
        })
    }, [])

    useEffect(() => {
        const listBillByBillDetail = () => {
            const updatedListBillByBillDetail = new Array(bill1.length).fill(0);
            if (bill1.length > 0) {
                for (let i = 0; i < bill1.length; i++) {
                    let product = [];
                    for (let j = 0; j < bills.length; j++) {
                        if (bills[j]?.bill.id === bill1[i]) {
                            product.push(bills[j]);
                        }
                    }
                    updatedListBillByBillDetail[i] = product;
                }
            }
            setListBillByBillDetail(updatedListBillByBillDetail);
        };

        listBillByBillDetail();
    }, [bills, bill1]);


    useEffect(() => {
        let totalPrice = 0;
        for (let i = 0; i < bills.length; i++) {
            totalPrice += bills[i].total;
        }
        setTotalPrice(totalPrice);
    }, [bills]);

    useEffect(() => {
        console.log(idAccount)
        findUserByAccount(idAccount).then((res) => {
            setUser(res)
        })
    }, [])


    const checkEmpty = (list) => {
        return list.length !== 0
    }

    function sumQuantity(id) {
        let quantity = 0;
        for (let i = 0; i < bills.length; i++) {
            if (bills[i].bill.id === id) {
                quantity += bills[i].quantity;
            }
        }
        return quantity;
    }

    function sumPrice(id) {
        let price = 0;
        for (let i = 0; i < bills.length; i++) {
            if (bills[i].bill.id === id) {
                price += bills[i].price * bills[i].quantity;
            }
        }
        return price;
    }

    return (
        <>
            {checkEmpty(listBillByBillDetail) ?
                <div className='cart bg-whitesmoke'>
                    <div className='containerr'>
                        <div className='cart-ctable3'>
                            <div className='cart-chead bg-white' style={{height: "50px"}}>
                                <div style={{display: "flex"}}><h3 style={{color: "red", paddingTop: "11px"}}>
                                    <IoLocationOutline style={{scale: "1.2", marginRight: "5px"}}/>Địa chỉ nhận hàng :
                                </h3>
                                    <b style={{
                                        fontSize: "15px",
                                        marginLeft: "10px",
                                        marginTop: "10px"
                                    }}>{user?.name} ({user?.phone})</b>
                                    <p style={{
                                        fontSize: "13px",
                                        marginLeft: "15px",
                                        marginTop: "12px"
                                    }}>{user?.address} {user?.wards?.name}, {user?.wards?.district?.name}, {user?.wards?.district?.city?.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className='cart-ctable3'>
                            <div className='cart-chead bg-white'>
                                <div className='cart-ctr fw-6 font-manrope fs-15'>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt'>STT</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt'>Sản phẩm</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt'>Đơn giá</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt'>Số lượng</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt'>Thành tiền</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginLeft: "10px"}}>Lý do hủy</span>
                                    </div>
                                </div>
                            </div>

                            <div className='cart-cbody bg-white'>
                                {
                                    listBillByBillDetail.map((bill, index) => {
                                        return (<>
                                            <div className='cart-ctr fw-8 font-manrope fs-16'
                                                 style={{
                                                     padding: "14px 15px",
                                                     display: "flex",
                                                     backgroundColor: 'rgba(232, 232, 232)',
                                                     margin: "0 0"
                                                 }}>
                                                <div className='cart-cth shop-name'
                                                     style={{fontSize: "16px", maxHeight: "50px", display: "flex"}}>
                                                    <div style={{width: "830px", marginTop: "5px"}}>
                                                        <CiShop style={{transform: "scale(1.5)", marginRight: "13px"}}/>
                                                        <Link
                                                            to={"/shop-management/shop-profile/" + bill[0]?.product?.shop?.id}>
                                                        <span style={{
                                                            color: "#BB0F53",
                                                            marginRight: "7px"
                                                        }}>{bill[0]?.product?.shop?.name}</span>
                                                        </Link>
                                                        <BsArrowThroughHeart style={{
                                                            transform: "scale(1.3)",
                                                            marginRight: "10px",
                                                            color: "E70B21"
                                                        }}/>
                                                    </div>
                                                    <div style={{width: "300px"}}>
                                                      <span style={{
                                                          color: "#BB0F53"
                                                      }}>Ngày hủy: {bill[0]?.bill?.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='cart-ctr fw-8 font-manrope fs-16'
                                                 style={{padding: "14px 15px", display: "flex", margin: "0 0",}}>
                                                <div style={{height: '50px'}}>
                                                    <div style={{padding: '10px', display: "flex"}}>
                                                        <div style={{width: '615px'}}>
                                                            <span>Mã đơn hàng: 2903VDC02{bill[0]?.bill?.id}</span></div>
                                                        <div style={{width: '120px', marginLeft: '10px'}}>  <span
                                                        >{sumQuantity(bill[0].bill.id)}</span>
                                                        </div>
                                                        <div style={{width: '150px'}}><span
                                                            style={{marginLeft: "30px"}}>{formatPrice(sumPrice(bill[0].bill.id))}</span>
                                                        </div>
                                                        <div style={{width: '220px'}}><span style={{marginLeft:"25px"}}>{bill[0].bill.reason}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='cart-cbody bg-white'>
                                                {bill.map((billDetail, index) => {
                                                    return (
                                                        <div className='cart-ctr py-5' key={billDetail?.id}>
                                                            <div className='cart-ctd'>
                                                                <span className='cart-ctxt'>{index + 1}</span>
                                                            </div>
                                                            <div className='cart-ctd'
                                                                 style={{display: 'flex', alignItems: 'center'}}>
                                                                <img
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "50px",
                                                                        marginRight: "20px"
                                                                    }}
                                                                    src={billDetail?.product?.image[0].name}
                                                                    alt="..."
                                                                />
                                                                <span
                                                                    className='cart-ctxt'>{billDetail?.product?.name}</span>
                                                            </div>
                                                            <div className='cart-ctd'>
                                          <span className='cart-ctxt'>
                                           (<del>{formatPrice(billDetail.product.price)}</del>) / {formatPrice(billDetail.price)}
                                          </span>
                                                            </div>
                                                            <div className='cart-ctd' style={{marginLeft: "27px"}}>
                                                                <span className='cart-ctxt'>{billDetail.quantity}</span>
                                                            </div>
                                                            <div className='cart-ctd'>
                                                                <billDetail
                                                                    className='cart-ctxt text-orange fw-5'
                                                                    style={{marginLeft: "20px"}}>{formatPrice(billDetail.total)}</billDetail>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </>)
                                    })
                                }
                            </div>

                            <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                                <div className='cart-cfoot-r flex flex-column justify-end'>
                                    <div
                                        className='total-txt flex align-center justify-end'>
                                        <div className='font-manrope fw-10'
                                             style={{
                                                 fontSize: "15px",
                                                 fontStyle: "normal",
                                                 marginTop: "5px",
                                                 textAlign: "right",
                                                 width: "910px"
                                             }}>Tổng
                                            tiền:
                                        </div>
                                        <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalPrice)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className='containerr my-5'>

                    <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
                        <img src={shopping_cart} alt=""/>
                        <span className='fw-6 fs-15 text-gray'>Đơn hàng trống</span>
                        <Link to="/" className='shopping-btn bg-orange text-white fw-5'>Mua hàng ngay!</Link>
                    </div>
                </div>}

        </>
    )
}

export default CancelUser