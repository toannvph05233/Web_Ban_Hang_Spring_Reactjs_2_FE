import React, {useEffect, useState} from 'react';
import "./BillPage.scss";
import {shopping_cart} from '../../utils/images';
import {Link, useNavigate} from 'react-router-dom';
import {formatPrice} from '../../utils/helpers';
import {saveBill, showCartDetailUserSelect} from "../../service/BillService";
import {findUserByAccount} from "../UserManagement/Service/UserService";
import {CiShop} from "react-icons/ci";
import {BsArrowThroughHeart} from "react-icons/bs";
import {IoLocationOutline} from "react-icons/io5";
import {toast} from "react-toastify";


const Bill = () => {
    const idAccount = localStorage.getItem("account")
    const navigate = useNavigate()
    const [totalPrice, setTotalPrice] = useState(0)
    const [user, setUser] = useState({})
    const isChecked = JSON.parse(localStorage.getItem("isChecked"));
    const [cartDetails, setCartDetails] = useState([])
    const [shops, setShops] = useState([])
    const [listCartByShop, setListCartByShop] = useState([])
    const [selectedOption, setSelectedOption] = useState(""); // Khởi tạo state để lưu giá trị của select


    useEffect(() => {
        showCartDetailUserSelect(isChecked).then((response) => {
            setCartDetails(response)
            const checkShop = [];
            response.forEach((cart) => {
                if (!checkShop.includes(cart.product.shop.name)) {
                    checkShop.push(cart.product.shop.name);
                }
            });
            setShops(checkShop);
        })
    }, [])


    useEffect(() => {
        const listCartByShop = () => {
            const updatedListCartByShop = new Array(shops.length).fill(0);
            if (cartDetails.length > 0) {
                for (let i = 0; i < shops.length; i++) {
                    let product = [];
                    for (let j = 0; j < cartDetails.length; j++) {
                        if (cartDetails[j]?.product?.shop?.name === shops[i]) {
                            product.push(cartDetails[j]);
                        }
                    }
                    updatedListCartByShop[i] = product;
                }
            }
            setListCartByShop(updatedListCartByShop);
        };

        listCartByShop();
    }, [cartDetails, shops]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value); // Cập nhật giá trị state khi select thay đổi
    };

    useEffect(() => {
        console.log(idAccount)
        findUserByAccount(idAccount).then((res) => {
            setUser(res)
        })
    }, [])


    useEffect(() => {
        const singleSumPrice = (cart) => {
            const productPrice = cart.product.price - (cart.product.price * cart.product.promotion / 100);
            return productPrice * cart.quantity;
        };
        const sumPrice = cartDetails.map((cart) => singleSumPrice(cart));
        let totalPrice = 0;
        for (let i = 0; i < sumPrice.length; i++) {
            totalPrice += sumPrice[i];
        }
        setTotalPrice(totalPrice);

    }, [cartDetails]);


    const saveBills = () => {
        if (user.address !== null && user.phone !== null) {
            saveBill(idAccount, cartDetails, navigate, selectedOption, totalPrice).then()
        } else {
            toast.error("Vui lòng nhập thông tin địa chỉ nhận hàng", {autoClose: 700})
            toast.isActive()
            navigate(("/user-management/profile"))
        }
    }

    function changeAddress() {
        navigate(("/user-management/profile"))
    }

    const checkEmpty = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].length > 0) {
                return true;
            }
        }
    }


    return (
        <>
            {checkEmpty(listCartByShop) ?
                <div className='cart bg-whitesmoke'>
                    <div className='containerr'>
                        <div className='cart-ctable1'>
                            <div className='cart-chead bg-white' style={{height: "50px"}}>
                                <div style={{display: "flex"}}><h3 style={{color: "red", paddingTop: "10px"}}>
                                    <IoLocationOutline style={{scale: "1.2", marginRight: "5px"}}/>Địa chỉ nhận hàng :
                                </h3>
                                    <b style={{
                                        fontSize: "15px",
                                        marginLeft: "10px",
                                        marginTop: "10px"
                                    }}>{user.name} ({user.phone})</b>
                                    <p style={{
                                        fontSize: "13px",
                                        marginLeft: "15px",
                                        marginTop: "12px"
                                    }}>{user?.address} {user?.wards?.name}, {user?.wards?.district?.name}, {user?.wards?.district?.city?.name}</p>

                                    <button style={{marginLeft: "50px", marginTop: "3px"}} type="button"
                                            className='delete-btn text-danger' onClick={() => {
                                        changeAddress()
                                    }}>Thay đổi
                                    </button>

                                </div>

                            </div>
                        </div>
                        <div className='cart-ctable'>
                            <div className='cart-chead bg-white'>
                                <div className='cart-ctr fw-6 font-manrope fs-15'>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginLeft: "10px"}}>STT</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginLeft: "20px"}}>Sản phẩm</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginLeft: "10px"}}>Đơn giá</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt'>Số lượng</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt'>Thành tiền</span>
                                    </div>
                                </div>
                            </div>

                            <div className='cart-cbody bg-white'>
                                {
                                    listCartByShop.map((cart) => {
                                        return (
                                            <>
                                                <div className='cart-ctr fw-8 font-manrope fs-16'
                                                     style={{
                                                         padding: "14px 15px",
                                                         display: "flex",
                                                         backgroundColor: 'rgba(232, 232, 232)',
                                                         margin: "0 0"
                                                     }}>
                                                    <div className='cart-cth shop-name'
                                                         style={{fontSize: "16px", marginBottom: "10px"}}>
                                                        <CiShop style={{transform: "scale(1.5)", marginRight: "13px"}}/>
                                                        <Link
                                                            to={"/shop-management/shop-profile/" + cart[0]?.product?.shop?.id}>
                                                            <span style={{
                                                                color: "#BB0F53",
                                                                marginRight: "7px"
                                                            }}>{cart[0]?.product?.shop?.name}</span>
                                                        </Link>
                                                        <BsArrowThroughHeart style={{
                                                            transform: "scale(1.3)",
                                                            marginRight: "10px",
                                                            color: "E70B21"
                                                        }}/>
                                                    </div>
                                                </div>
                                                <div className='cart-cbody bg-white'>
                                                    {cart.map((cartDetail, index) => {
                                                        return (
                                                            <div className='cart-ctr py-5' key={cartDetail?.id}>
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
                                                                        src={cartDetail?.product?.image[0].name}
                                                                        alt="..."
                                                                    />
                                                                    <span
                                                                        className='cart-ctxt'>{cartDetail?.product?.name}</span>
                                                                </div>
                                                                <div className='cart-ctd'>
                                          <span className='cart-ctxt'>
                                           (<del>{formatPrice(cartDetail?.product?.price)}</del>) / {formatPrice(cartDetail?.product?.price - (cartDetail?.product?.price * cartDetail?.product?.promotion / 100)
                                          )}
                                          </span>
                                                                </div>
                                                                <div className='cart-ctd' style={{marginLeft: "27px"}}>
                                                                    <span
                                                                        className='cart-ctxt'>{cartDetail.quantity}</span>

                                                                </div>

                                                                <div className='cart-ctd'>
                                            <span
                                                className='cart-ctxt text-orange fw-5'
                                                style={{marginLeft: "20px"}}>{formatPrice((cartDetail.product.price - (cartDetail.product.price * cartDetail.product.promotion / 100)) * cartDetail.quantity)}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>)
                                    })
                                }
                            </div>
                            <br/>
                            <span style={{fontSize: '16px', color: "orange"}}>Chọn loại thanh toán :  </span>
                            <select style={{fontSize: '16px'}} value={selectedOption} onChange={handleChange}>
                                <option value="offline">Nhận hàng thanh toán</option>
                                <option value="paypal">Thanh toán online PAYPAL</option>
                                <option value="vnpay">Thanh toán online VNPAY</option>
                            </select>

                            <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                                <div className='cart-cfoot-r flex flex-column justify-end'>
                                    <div className='total-txt flex align-center justify-end'>
                                        {/*<div className='font-manrope fw-5'>Total ({itemsCount}) items:</div>*/}
                                        <div className='font-manrope fw-10'
                                             style={{fontSize: "15px", fontStyle: "normal", marginTop: "5px"}}>Tổng
                                            tiền:
                                        </div>
                                        <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalPrice)}</span>
                                    </div>

                                    <button style={{position: "absolute", right: "20px"}} type="button"
                                            className='checkout-btn text-white bg-orange fs-16' onClick={() => {
                                        saveBills()
                                    }}>Thanh toán
                                    </button>
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


export default Bill
