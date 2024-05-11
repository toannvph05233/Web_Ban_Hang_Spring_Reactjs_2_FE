import React, {useContext, useEffect, useState} from 'react';
import "./CartPage.scss";
import {shopping_cart} from '../../utils/images';
import {Link, useNavigate} from 'react-router-dom';
import {formatPrice} from '../../utils/helpers';
import {deleteAllProductFromCart, deleteProductFromCart, showCart, updateQuantity} from "../../service/CartService";
import {CiShop} from "react-icons/ci";
import {BsArrowThroughHeart} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import {pink} from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import {toast} from "react-toastify";
import {AppContext} from "../../Context/AppContext";
import swal from 'sweetalert';


const CartPage = () => {
    const [carts, setCarts] = useState([])
    const idAccount = localStorage.getItem("account")
    const [totalPrice, setTotalPrice] = useState([]);
    let [idCart, setIdCart] = useState();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState([])
    const [shops, setShops] = useState([])
    const [check, setCheck] = useState(false)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [listCartByShop, setListCartByShop] = useState([])
    const {toggleFlag } = useContext(AppContext);
    const {isFlag } = useContext(AppContext);


    useEffect(() => {
        showCart(idAccount).then((response) => {
            setCarts(response);
            const checkShop = [];
            response.forEach((cart) => {
                if (!checkShop.includes(cart.product.shop.name)) {
                    checkShop.push(cart.product.shop.name);
                }
            });
            setShops(checkShop);
        });
    }, [check, idAccount,isFlag]);


    useEffect(() => {
        const listCartByShop = () => {
            const updatedListCartByShop = new Array(shops.length).fill(0);
            if (carts.length > 0) {
                for (let i = 0; i < shops.length; i++) {
                    let product = [];
                    for (let j = 0; j < carts.length; j++) {
                        setIdCart(carts[0].cart.id)
                        if (carts[j]?.product?.shop?.name === shops[i]) {
                            product.push(carts[j]);
                        }
                    }
                    updatedListCartByShop[i] = product;
                }
            }
            setListCartByShop(updatedListCartByShop);
        };

        listCartByShop();
    }, [carts, shops]);

    const checkEmpty = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].length > 0) {
                return true;
            }
        }
    }


    useEffect(() => {
        const singleSumPrice = (cart) => {
            const productPrice = cart.product.price - (cart.product.price * cart.product.promotion / 100);
            return productPrice * cart.quantity;
        };
        const sumPrice = carts.map((cart) => singleSumPrice(cart));
        let totalPrice = 0;
        for (let i = 0; i < sumPrice.length; i++) {
            totalPrice += sumPrice[i];
        }
        setTotalPrice(totalPrice);

    }, [carts]);


    const increaseQty = (quantity, idProduct, idCart, maxQty) => {
        if (quantity <= maxQty) {
            updateQuantityInDB(quantity, idProduct, idCart);
        } else {
            toast.error("Số lượng sản phẩm bạn muốn mua đã hết hàng", { autoClose: 700 })
        }
    }

    const decreaseQty = (quantity, idProduct, idCart, idCartDetail) => {
        if (quantity >= 1) {
            updateQuantityInDB(quantity, idProduct, idCart);
        } else {
            deleteProduct(idCartDetail);
        }
    }


    const updateQuantityInDB = (idProduct, quantity, idCart) => {
        updateQuantity(idProduct, quantity, idCart).then(() => {
            setCheck(!check)
        })

    }

    function deleteProduct(idCartDetail) {
        swal({
            text: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
            icon: "info",
            buttons: {
                cancel: true,
                confirm: true
            },
        }).then(r => {
            if(r) {
                deleteProductFromCart(idCartDetail).then(() => {
                    setCheck(!check);
                    toast.success("Xóa sản phẩm thành công",{ autoClose: 700 })
                    toggleFlag()
                })
            }
        })
    }

    function deleteAll(idCart) {
        swal({
            text: "Bạn có chắc chắn muốn xóa hết sản phẩm không?",
            icon: "info",
            buttons: {
                cancel: true,
                confirm: true
            },
        }).then(r => {
            if(r) {
                deleteAllProductFromCart(idCart).then(() => {
                    setCheck(!check);
                    toast.success("Xóa toàn bộ sản phẩm thành công!", { autoClose: 700 })
                    toggleFlag()
                })
            }
        })
    }

    const saveToBill = () => {
        if (isChecked.length === 0) {
            toast.error("Bạn chưa chọn sản phẩm nào!", { autoClose: 700 })
        }else {
            localStorage.setItem("isChecked", JSON.stringify(isChecked));
            navigate("/bill");
        }

    };

    const checked = (e, idCart) => {
        const check = e.target.checked;
        setIsChecked(prevChecked => {
            if (check) {
                return [...prevChecked, idCart]
            } else {
                return prevChecked.filter(id => id !== idCart)

            }
        })
    }


    return (
        <>

            {checkEmpty(listCartByShop) ?
                <div className='cart bg-whitesmoke'>
                    <div className='container-fluid'>
                        <div className='cart-ctable1'>
                            <div className='cart-chead bg-white'>
                                <div className='cart-ctr fw-6 font-manrope fs-15'>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt'  style={{marginLeft: "25px"}}>#</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginLeft: "10px"}}>Sản phẩm</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginLeft: "10px"}}>Đơn giá</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginLeft: "10px"}}>Số lượng</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginRight: "30px"}}>Số tiền</span>
                                    </div>
                                    <div className='cart-cth'>
                                        <span className='cart-ctxt' style={{marginRight: "50px"}}>Thao tác</span>
                                    </div>
                                </div>
                            </div>

                            <div className='cart-cbody bg-white'>
                                {listCartByShop.map((cart, idx) => {
                                    return (
                                        <>
                                            <div className='cart-ctr fw-8 font-manrope fs-16'
                                                 style={{padding: "14px 15px", display: "flex", backgroundColor: 'rgba(232, 232, 232)', margin: "0 0"}}>
                                                <div className='cart-cth shop-name'
                                                     style={{fontSize: "16px", marginBottom: "10px"}}>
                                                    <CiShop style={{transform: "scale(1.5)", marginRight: "13px"}}/>
                                                    <Link
                                                        to={"/shop-management/shop-profile/" + cart[0]?.product?.shop?.id}>
                                                        <span style={{color: "#BB0F53", marginRight: "7px"}}>{cart[0]?.product?.shop?.name}</span>
                                                    </Link>
                                                    <BsArrowThroughHeart style={{
                                                        transform: "scale(1.3)",
                                                        marginRight: "10px",
                                                        color: "E70B21"
                                                    }}/>
                                                </div>
                                            </div>

                                            {
                                                // item === STATUS.LOADING ? <Loader/> : <BillList items={item}/>
                                            }

                                            <div className='cart-cbody bg-white'>
                                                {cart.map((cartDetail, index) => {
                                                    return (
                                                        <div className='cart-ctr py-5' key={cartDetail?.id}>
                                                            {/*{setIdCart(cart?.cart.id)}*/}
                                                            <div className='cart-ctd'>
                                            <span className='cart-ctxt'>
                                                <Checkbox style={{scale:"1.5"}}
                                                    {...label}
                                                    defaultChecked
                                                    sx={{
                                                        color: pink[800],
                                                        '&.Mui-checked': {
                                                            color: pink[600],
                                                        },
                                                    }} checked={isChecked.includes(cartDetail?.id)} onChange={(e) => {
                                                    checked(e, cartDetail?.id)}}
                                                />
                                            </span>
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
                                                            <div className='cart-ctd'>
                                                                <div className='qty-change flex align-center'>
                                                                    <button type="button"
                                                                            className='qty-decrease flex align-center justify-center'
                                                                            onClick={() => {
                                                                                decreaseQty(cartDetail.quantity - 1, cartDetail.product.id, cartDetail.cart.id, cartDetail.id)
                                                                            }}>
                                                                        <i className='fas fa-minus'></i>
                                                                    </button>
                                                                    <div
                                                                        className='qty-value flex align-center justify-center'>
                                                                        <input max={cartDetail?.product?.quantity}
                                                                               min={1}
                                                                               style={{
                                                                                   width: "15px",
                                                                                   fontStyle: "2px",
                                                                                   textAlign: "center"
                                                                               }}
                                                                               type="text"
                                                                               value={(cartDetail.quantity >= cartDetail?.product?.quantity) ? (cartDetail?.product?.quantity) : cartDetail.quantity }
                                                                            // onChange={(e) => {
                                                                            //     const newQty = parseInt(e.target.value);
                                                                            //     setQuantitys[idx](newQty)
                                                                            //     if (newQty >= 1 && newQty <= cartDetail.product.quantity) {
                                                                            //         updateQuantityInDB(newQty, cartDetail.product.id, cartDetail.cart.id);
                                                                            //     }
                                                                            // }}
                                                                        />
                                                                    </div>
                                                                    <button type="button"
                                                                            className='qty-increase flex align-center justify-center'
                                                                            onClick={() => {
                                                                                increaseQty(cartDetail.quantity + 1, cartDetail.product.id, cartDetail.cart.id, cartDetail.product.quantity)
                                                                            }}>
                                                                        <i className='fas fa-plus'></i>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className='cart-ctd'>
                                            <span
                                                className='cart-ctxt text-orange fw-5' style={{marginLeft: "20px"}}>{formatPrice((cartDetail.product.price - (cartDetail.product.price * cartDetail.product.promotion / 100)) * cartDetail.quantity)}</span>
                                                            </div>

                                                            <div className='cart-ctd'>
                                                                <RiDeleteBin6Line style={{scale:"1.5", marginLeft: "40px"}} onClick={() => deleteProduct(cartDetail.id)} />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>


                                        </>)
                                })}

                            </div>


                            {/*))}*/}

                            <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                                <div className='cart-cfoot-l'>
                                    <button style={{marginTop: "40px"}} type='button'
                                            className='clear-cart1-btn text-danger fs-15 text-uppercase fw-4'
                                            onClick={() => {
                                                deleteAll(idCart)
                                            }}>
                                        <i className='fas fa-trash'></i>
                                        <span className='mx-1'>Xóa tất cả sản phẩm</span>
                                    </button>
                                </div>

                                <div className='cart-cfoot-r flex flex-column justify-end'>
                                    <div className='total-txt flex align-center justify-end'>
                                        {/*<div className='font-manrope fw-5'>Total ({itemsCount}) items:</div>*/}
                                        <div className='font-manrope fw-10'
                                             style={{fontSize: "15px", fontStyle: "normal", marginTop: "5px"}}>Tổng
                                            tiền:
                                        </div>
                                        <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalPrice)}</span>
                                    </div>

                                    <button type="button" className='checkout-btn text-white bg-orange fs-16'
                                            onClick={() => {
                                                saveToBill()
                                            }}>Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className='containerr my-5'>

                    <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
                        <img src={shopping_cart} alt=""/>
                        <span className='fw-6 fs-15 text-gray'>Giỏ hàng trống</span>
                        <Link to="/" className='shopping-btn bg-orange text-white fw-5'>Mua hàng ngay!</Link>
                    </div>
                </div>
            }

        </>
    )
}

export default CartPage




