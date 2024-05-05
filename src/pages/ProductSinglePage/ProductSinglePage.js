import React, {useContext, useEffect, useState} from 'react';
import "./ProductSinglePage.scss";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getSingleProductStatus} from '../../store/productSlice';
import {STATUS} from '../../utils/status';
import Loader from "../../components/Loader/Loader";
import {formatPrice} from "../../utils/helpers";
import {getCartMessageStatus} from '../../store/cartSlice';
import CartMessage from "../../components/CartMessage/CartMessage";
import {getProductById} from "../../service/ProductService";
import {addToCart} from "../../service/CartService";
import {findShop} from "../ShopManagement/service/ProfileService";
import {createReply, findCommentByIdP} from "../../service/CommentService";
import {toast} from "react-toastify";
import "./Comment.scss"
import {FaStar} from "react-icons/fa";
import UserService from "../../service/ChatService";
import {FormatTime} from "../../components/Format/FormatTime";
import {AppContext} from "../../Context/AppContext";
import axios from "axios";


const ProductSinglePage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({image: []});
    const [cartDetail, setCartDetail] = useState({});
    const productSingleStatus = useSelector(getSingleProductStatus);
    const [quantity, setQuantity] = useState(1);
    const cartMessageStatus = useSelector(getCartMessageStatus);
    let idAccount = +localStorage.getItem("account");
    let navigate = useNavigate()
    let [comments, setComments] = useState([]);
    const [idShop, setIdShop] = useState(0);
    const [reply, setReply] = useState('')
    const [isFlagg, setIsFlag] = useState(true);
    const [isShow, setIsShow] = useState(true);
    const [isShowUpdate, setIsShowUpdate] = useState(true);
    let idUser = localStorage.getItem("account");
    const {toggleFlag} = useContext(AppContext);
    const {isFlag} = useContext(AppContext);
    const [imageSrc, setImageSrc] = useState('')
    const defaultImageUrl = "https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg";
    // getting single product
    useEffect(() => {
        window.scrollTo(0, 0);
        findShop(idAccount).then((res) => {
            setIdShop(res.id);
        }).catch(() => {
            setIdShop(0)
        })
        getProductById(id).then((res) => {
            console.log("res.data")
            console.log("res.data")
            console.log("res.data")
            console.log(res.data)
            setProduct(res.data);
            setImageSrc(res?.data?.image[0]?.name)
        })
        findCommentByIdP(id).then((res) => {
            setComments(res.data);
        })
    }, [cartMessageStatus, isFlagg]);
    useEffect(() => {
        if (idUser == null) {
            idUser = 0

        }
        axios.get("http://localhost:8080/api/cartDetails/" + id + "/" + idUser).then((res) => {
            setCartDetail(res.data)
        })
    }, [idUser, isFlag])

    let discountedPrice = (product?.price) - (product?.price * (product?.promotion / 100));
    if (productSingleStatus === STATUS.LOADING) {
        return <Loader/>
    }
    const changeImage = (img) => {
        // Kiểm tra xem ảnh hiện tại là ảnh nào và cập nhật state
        setImageSrc(img);
    };

    const increaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty + 1;
            if (tempQty > product?.quantity) {
                toast.error("Số lượng sản phẩm bạn muốn mua đã hết hàng", {autoClose: 700})
                tempQty = product?.quantity;
            }
            return tempQty;
        })
    }

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty - 1;
            if (tempQty < 1) {
                toast.error("Số lượng sản phẩm phải lớn hơn 0", {autoClose: 700})
                tempQty = 1;
            }
            return tempQty;
        })
    }
    const addToCartHandler = (product) => {
        if (idUser != null) {
            const cart = {
                product: {
                    id: product.id
                },
                quantity: quantity
            }
            if (cartDetail === "" || cartDetail.quantity < product.quantity) {
                addToCart(cart, idAccount).then(() => {
                    toggleFlag()
                })
            } else {
                toast.error("Số lượng sản phẩm bạn muốn mua đã hết hàng", {autoClose: 700})
            }
        } else {
            toast.error("Bạn cần đăng nhập để mua sản phẩm", {autoClose: 700})
        }
    }

    function shopProfile(id) {
        return navigate("/shop-management/shop-profile/" + id)
    }

    function saveToBill() {
        if (idUser != null) {
            if (cartDetail !== "" || cartDetail.quantity >= product.quantity) {
                toast.error("Số lượng sản phẩm bạn muốn mua đã hết hàng", {autoClose: 700})

            } else {

                addToCartHandler(product)
                navigate("/cart");
            }
        } else {
            toast.error("Bạn cần đăng nhập để mua sản phẩm", {autoClose: 700})
        }
    }


    const toChat = () => {
        UserService.createMessage(idUser, product.shop.account.id)
            .then(() => {
                navigate("/chat")
            })

    };

    return (
        <main className='py-5 bg-whitesmoke'>
            <div className='product-single'>
                <div className='containerr'>
                    <div className='product-single-content bg-white grid'>
                        <div className='product-single-l'>
                            <div className='product-img'>
                                <div className='product-img-zoom' style={{border: '1px solid black'}}>
                                    <img style={{
                                        width: '350px',
                                        height: '350px',
                                        marginLeft: '100px',
                                        marginTop: '10px'
                                    }}
                                         src={product?.image === undefined ? '' : imageSrc} alt=""
                                         className='img-cover'/>
                                </div>
                                <div className='product-img-thumbs flex align-center my-2'>
                                    {product?.image?.map(p => {
                                        return (
                                            <div className='thumb-item'
                                                 onClick={() => {
                                                     changeImage(p?.name)
                                                 }}>
                                                <img src={p?.name} alt="" className='img-cover'/>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>

                        <div className='product-single-r'>
                            <div className='product-details font-manrope'>
                                <div className='title fs-20 fw-5'>{product?.name}</div>

                                <div className='info flex align-center flex-wrap fs-14'>
                                    <div className='rating'>
                                        <span className='text-orange fw-5'
                                              style={{marginRight: '20px'}}>Đánh giá: </span>
                                        <span className='mx-1'>
                                    {/*{product?.rating}*/}5 *
                                    </span>

                                    </div>
                                    <div className='vert-line'></div>
                                    {/*<div className='brand'>*/}
                                    <span className='text-orange fw-5' style={{marginRight: '20px'}}>||</span>
                                    {/*  <span className='mx-1'>{product?.brand?.name}</span>*/}
                                    {/*</div>*/}
                                    <div className='vert-line'></div>
                                    <div className='brand'>
                                        <span className='text-orange fw-5'>Đã bán: </span>
                                        <span className='mx-1 text-capitalize'>
                      {product?.count}
                    </span>


                                        <span className='mx-1 text-capitalize'> {product?.option?.name}</span>


                                    </div>
                                </div>

                                <div className="price">
                                    <div className='flex align-center my-1'>
                                        <div className='old-price text-gray' style={{marginRight: '20px'}}>
                                            {formatPrice(product?.price)}
                                        </div>
                                        <div className='new-price fw-5 font-poppins fs-24 text-orange'
                                             style={{marginRight: '20px'}}>
                                            {formatPrice(discountedPrice)}
                                        </div>
                                        <div className='discount bg-orange fs-13 text-white fw-6 font-poppins'>
                                            {product?.promotion}% GIẢM
                                        </div>
                                    </div>
                                </div>

                                <div className='qty flex align-center my-4'>
                                    <div className='qty-text'>Số lượng:</div>
                                    <div className='qty-change flex align-center mx-3'>
                                        <button type="button" className='qty-decrease flex align-center justify-center'
                                                onClick={() => decreaseQty()}>
                                            <i className='fas fa-minus'></i>
                                        </button>
                                        <div className="qty-value flex align-center justify-center">{quantity}</div>
                                        <button type="button" className='qty-increase flex align-center justify-center'
                                                onClick={() => increaseQty()}>
                                            <i className='fas fa-plus'></i>
                                        </button>
                                        <div className='qty-text' style={{marginLeft: '20px'}}>{product.quantity} sản
                                            phẩm có sẵn
                                        </div>
                                    </div>
                                    {
                                        (product?.quantity === 0) ? <div
                                            className='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>out
                                            of stock</div> : ""
                                    }
                                </div>

                                <div className='btns'>
                                    <button type="button" className='add-to-cart-btn btn'
                                            disabled={idShop === product?.shop?.id}>
                                        <i className='fas fa-shopping-cart'></i>
                                        <span className='btn-text mx-2' onClick={() => {
                                            addToCartHandler(product)
                                        }}>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button type="button" className='buy-now btn mx-3'
                                            disabled={idShop === product?.shop?.id} onClick={() => {
                                        saveToBill()
                                    }}>
                                        <span className='btn-text'>Mua ngay</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {cartMessageStatus && <CartMessage/>}
            <br/>
            <br/>
            <br/>
            <div className='product-single-r'>
                <div className='product-single'>
                    <div className='containerr'>
                        <div className='product-single-content bg-white grid'>
                            <div style={{display: 'flex'}}>
                                <img src={product?.shop?.avatar} alt=""
                                     style={{height: '80px', width: '80px', borderRadius: '50px'}}/>
                                <div style={{marginLeft: '20px'}}>
                                    <h3>
                                        {product?.shop?.name}
                                    </h3>
                                    <div>
                                        <button
                                            style={{padding: '10px', border: '1px solid white'}}
                                            type="button"
                                            className="comic-button"
                                            onClick={(() => {
                                                toChat()

                                            })}
                                        >
                                            Chat ngay
                                        </button>

                                        <button onClick={() => {
                                            shopProfile(product?.shop?.id)
                                        }}
                                                style={{
                                                    padding: '10px',
                                                    border: '1px solid #d70018',
                                                    marginLeft: '10px'
                                                }}
                                                className="comic-button">Xem Shop
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: '50px'}}>
                <div className='comment-single'>
                    <div className='comment-single'>
                        <div className='containerr'>
                            <h1>MÔ TẢ SẢN PHẨM</h1>
                            <div className=' bg-white grid'>
                                <div className={"container"} style={{padding: '4%'}}>
                                    <p className='para fw-3 fs-15'
                                       style={{whiteSpace: 'pre-line'}}>{product?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginTop: '50px'}}>
                <div className='comment-single'>
                    <div className='comment-single'>
                        <div className='containerr'>
                            <h1 style={{marginBottom: '20px', fontSize: '24px'}}>ĐÁNH GIÁ SẢN PHẨM
                                &nbsp; <FaStar
                                    style={{color: 'F5E932'}}/><FaStar style={{color: 'F5E932'}}/><FaStar
                                    style={{color: 'F5E932'}}/><FaStar style={{color: 'F5E932'}}/><FaStar/>
                            </h1>
                            <div className=' bg-white grid' style={{paddingTop: '3%'}}>
                                {comments.map((c) => (
                                    <>
                                        <div className="comment-container"
                                             style={{marginLeft: '10%', marginRight: '10%'}}>
                                            <div style={{display: 'flex'}}>
                                                <div className="avatar-container">
                                                    <img
                                                        src={c?.user?.avatar || defaultImageUrl}
                                                        alt="Avatar"
                                                    />

                                                </div>
                                                <div
                                                    style={{fontWeight: 'bold', padding: '10px 0px', fontSize: '14px'}}>
                                                    Người dùng: {c?.account?.username}
                                                </div>
                                                <div style={{padding: '10px 0px', fontSize: '12px'}}>
                                                    &nbsp;&nbsp; &nbsp;&nbsp; Loại: {c?.product?.category?.name}
                                                </div>
                                                <div style={{padding: '10px 0px', fontSize: '12px'}}>
                                                    &nbsp;&nbsp; &nbsp;&nbsp; Hãng: {c?.product?.brand?.name}
                                                </div>
                                            </div>
                                            <div className="comment-details">

                                                <div style={{
                                                    marginBottom: '5px',
                                                    maxWidth: '900px',
                                                    marginLeft: '60px'
                                                }}>Nội dung: {c?.content}</div>
                                                <div style={{marginBottom: '5px', marginLeft: '60px'}}>
                                                    Thời gian: {FormatTime(c?.createAt)}</div>

                                                {/*hien thi nut sua comment cua user*/}
                                                {/*{(c.account.id===idAccount) ?*/}
                                                {/*        <>*/}
                                                {/*            <button style={{fontSize: '14px'}} disabled={!isShowUpdate}*/}
                                                {/*                    onClick={() => setIsShow(!isShowUpdate)}>Sửa &nbsp;<i*/}
                                                {/*                className="fa-sharp fa-regular fa-pen-to-square"*/}
                                                {/*                style={{color: '#b61b1b'}}></i></button>*/}
                                                {/*            <div className="reply-container">*/}
                                                {/*        <textarea*/}
                                                {/*            disabled={isShowUpdate}*/}
                                                {/*            className="reply-textarea"*/}
                                                {/*            onChange={handleComment}*/}
                                                {/*            placeholder="Sửa phản hồi của bạn..."*/}
                                                {/*        />*/}
                                                {/*            </div>*/}
                                                {/*            <button className="reply-button"*/}
                                                {/*                    disabled={isShowUpdate}*/}
                                                {/*                    onClick={() => saveReply(c?.id)}> Gửi*/}
                                                {/*            </button>*/}
                                                {/*        </>*/}

                                                {/*    : ''}*/}

                                                {/*Hien thi phan hoi cua shop*/}
                                                {c?.reply !== null ? (
                                                    <div style={{
                                                        marginLeft: '100px',
                                                        fontWeight: 'bold',
                                                        color: "2A2727"
                                                    }} className="shop-reply">Shop phản
                                                        hồi: {c?.reply}</div>
                                                ) : ''}

                                                {(product?.shop?.id === idShop) ? (
                                                    <>
                                                        <button style={{fontSize: '14px', marginLeft: '50px'}}
                                                                disabled={!isShow}
                                                                onClick={() => setIsShow(!isShow)}>Phản hồi &nbsp;<i
                                                            className="fa-sharp fa-regular fa-pen-to-square"
                                                            style={{color: '#b61b1b'}}></i></button>
                                                        <div className="reply-container">
                                                    <textarea
                                                        id={'rep'}
                                                        disabled={isShow}
                                                        className="reply-textarea"
                                                        onChange={handleReply}
                                                        value={reply}
                                                        placeholder="Nhập phản hồi của bạn..."
                                                    />
                                                            <button className="reply-button"
                                                                    disabled={isShow}
                                                                    onClick={() => saveReply(c?.id)}>Trả lời
                                                            </button>
                                                        </div>

                                                    </>
                                                ) : ''}
                                            </div>
                                        </div>
                                        <br/>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    )

    function saveReply(id) {
        if (reply !== '') {
            createReply(id, reply).then(() => {
                toast.success("Thêm thành công!")
                setIsFlag(!isFlagg)
                setIsShow(!isShow)
                setReply('')

            })
        } else {
            toast.error("Thêm không thành công!")
        }


    }

    function handleReply(e) {
        setReply(e.target.value)
    }

    function handleComment(e) {

    }

    function displayTime(time) {
        return time.split("T")
    }
}

export default ProductSinglePage
