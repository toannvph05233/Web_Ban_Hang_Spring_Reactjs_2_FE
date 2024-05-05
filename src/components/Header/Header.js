import React, {useContext, useEffect, useState} from 'react';
import "./Header.scss";
import {Link, useNavigate} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import {AppContext} from "../../Context/AppContext";
import {findAccountById} from "../../service/UserService";
import {findUserByAccount} from "../../pages/UserManagement/Service/UserService";
import {toast} from "react-toastify";
import {notificationShop, notificationUser, setStatus} from "../../service/NotificationService";
import moment from "moment";
import {FormatTime} from "../Format/FormatTime";
import {FaFacebookMessenger} from "react-icons/fa";

const Header = (props) => {
    const navigate = useNavigate();
    const {checkLogin} = useContext(AppContext);
    const {logout} = useContext(AppContext);
    const {isFlag} = useContext(AppContext);
    const {toggleFlag} = useContext(AppContext);
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [notiShop, setNotiShop] = useState([]);
    const [notiUser, setNotiUser] = useState([]);
    let acc = localStorage.getItem('account');
    let account = JSON.parse(localStorage.getItem('accountLogin'));
    useEffect(() => {
        if (acc !== null) {
            findAccountById(acc).then((res) => {
                setUsername(res.data.username);
            }).catch(() => {
                navigate('/login')
            })
            findUserByAccount(acc).then((res) => {
                setAvatar(res.avatar)
            }).catch(() => {
                navigate('/login')
            })
            notificationShop(acc).then((res) => {
                setNotiShop(res.data)
            }).catch(() => {
            })
            notificationUser(acc).then((res) => {
                setNotiUser(res.data)
            }).catch(() => {
            })
        }
    }, [isFlag, checkLogin]);
    const listNoti = [...notiShop, ...notiUser];

    listNoti.sort((a, b) => b.id - a.id);
    return (
        <header className='header1 text-white'>
            <div className='containerr'>
                <div className='header1-cnt'>
                    <div className='header1-cnt-top fs-13 py-2 flex align-center justify-between'>
                        <div className='header1-cnt-top-l'>
                            <ul className='flex top-links align-center' style={{marginTop: '3%', marginBottom: '-1%'}}>
                                <li>
                                    {/* dummy links */}
                                    <Link to="/seller" style={{}}>Kênh người bán</Link>
                                </li>
                                <li style={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    margin: '-5px 7px 0 7px'
                                }}> |
                                </li>
                                <li>
                                    {/* dummy links */}
                                    <Link to="/download">Tải xuống</Link>
                                </li>
                                <li style={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    margin: '-5px 7px 0 7px'
                                }}> |
                                </li>

                                <li className='flex align-center'>
                                    <span className='fs-13'><Link to={"/chat"}>Chat</Link></span>
                                    <ul className='social-links flex align-center'>
                                        <li className='mx-2' style={{marginBottom: "3px"}}>
                                            <FaFacebookMessenger style={{scale: "1.2"}}/>
                                        </li>
                                        <li className='mx-2'>
                                            <a href="www.facebook.com" className='fs-15'>
                                                <i className='fab fa-facebook'></i>
                                            </a>
                                        </li>
                                        <li className='mx-2'>
                                            <a href="www.instagram.com" className='fs-15'>
                                                <i className='fab fa-instagram'></i>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className='header1-cnt-top-r'>
                            <ul className='top-links flex align-center'>

                                <li style={checkLogin
                                    ? {display: 'none'} : {}}>
                                    <a href="#" className=" nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                       style={{
                                           width: '120px',
                                           marginLeft: '-90%',
                                           marginBottom: '-53%',
                                           display: "flex"
                                       }} onClick={() => {
                                        toggleFlag()
                                    }}>
                                        <div style={{marginRight: '2%'}}><i className="fa-regular fa-bell"
                                                                            style={{color: '#e7ebf4'}}></i></div>
                                        <div style={{
                                            fontSize: '15px', color: 'white',
                                            fontFamily: 'Font Awesome 6 Free', marginRight: '2%'
                                        }}>Thông báo
                                        </div>


                                        <div style={{marginTop: '-1%'}}><span style={{
                                            color: 'white',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            margin: '0px 7px 100px 7px'
                                        }}>|</span></div>

                                    </a>
                                    {listNoti.length > 0 ?

                                        <div className="dropdown-menu m-0 noti ">
                                            {listNoti.map((item) => (
                                                <React.Fragment key={item.id}>
                                                    {item.title === 'Thông báo shop' ? (
                                                        <>
                                                            {item.content === 'Đơn hàng đã được đặt' ? (
                                                                <Link to={'/shop-management/order-management/confirm'}
                                                                      className="dropdown-item"
                                                                      style={item.status === null ? {
                                                                          backgroundColor: "#f5f5f8",
                                                                          height: '100px'
                                                                      } : {backgroundColor: "white", height: '100px'}}
                                                                      onClick={() => {
                                                                          setStatus(item.id).then((res) => {
                                                                              toggleFlag()
                                                                          })
                                                                      }}>
                                                                    <div style={{
                                                                        fontWeight: 'bold',
                                                                        paddingTop: '1%'
                                                                    }}>Shop của bạn
                                                                    </div>
                                                                    <div className="dropdown"
                                                                         style={{display: 'flex', paddingTop: '1%'}}>
                                                                        <div>
                                                                            {item?.avatar !== null ?
                                                                                <img src={item?.avatar} style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%'
                                                                                }} alt=""/>
                                                                                :
                                                                                <i className="fa-solid fa-user" style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                    color: '#c6c7cb',
                                                                                    fontSize: '30px'
                                                                                    ,
                                                                                    textAlign: 'center',
                                                                                    marginTop: '8%'
                                                                                }}></i>
                                                                            }
                                                                        </div>
                                                                        <div style={{
                                                                            marginLeft: '3%',
                                                                            width: '250px',
                                                                            color: 'black',
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis'
                                                                        }}>
                                                                        <span style={{
                                                                            display: 'block',
                                                                            width: '100%',
                                                                            whiteSpace: 'normal'
                                                                        }}>
                                                                            {item?.account?.username} đã mua hàng, vui lòng xác nhận đơn
                                                                        </span>
                                                                        </div>
                                                                        <div
                                                                            style={{marginTop: '10%'}}>{FormatTime(item.createAt)}</div>
                                                                    </div>
                                                                </Link>
                                                            ) : item.content === 'Đơn hàng bị hủy' ? (
                                                                <Link to={'/shop-management/order-management/cancel'}
                                                                      className="dropdown-item"
                                                                      style={item.status === null ? {
                                                                          backgroundColor: "#f5f5f8",
                                                                          height: '100px'
                                                                      } : {backgroundColor: "white", height: '100px'}}
                                                                      onClick={() => {
                                                                          setStatus(item.id).then((res) => {
                                                                              toggleFlag()
                                                                          })
                                                                      }}>
                                                                    <div style={{
                                                                        fontWeight: 'bold',
                                                                        paddingTop: '1%'
                                                                    }}>Shop của bạn {item.id}</div>
                                                                    <div className="dropdown"
                                                                         style={{display: 'flex', paddingTop: '1%'}}>
                                                                        <div>
                                                                            {item?.avatar !== null ?
                                                                                <img src={item?.avatar} style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%'
                                                                                }} alt=""/>
                                                                                :
                                                                                <i className="fa-solid fa-user" style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                    color: '#c6c7cb',
                                                                                    fontSize: '30px'
                                                                                    ,
                                                                                    textAlign: 'center',
                                                                                    marginTop: '8%'
                                                                                }}></i>
                                                                            }
                                                                        </div>
                                                                        <div style={{
                                                                            marginLeft: '3%',
                                                                            width: '250px',
                                                                            color: 'black',
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis'
                                                                        }}>
                                                                        <span style={{
                                                                            display: 'block',
                                                                            width: '100%',
                                                                            whiteSpace: 'normal'
                                                                        }}>
                                                                            Đơn hàng 2903VDC02{item?.bill?.id} đã bị hủy bởi {item?.account?.username}
                                                                        </span>
                                                                        </div>
                                                                        <div
                                                                            style={{marginTop: '10%'}}>{FormatTime(item.createAt)}</div>
                                                                    </div>
                                                                </Link>
                                                            ) : item.content === 'Đơn hàng đã được giao' ? (
                                                                <Link to={'/shop-management/order-management/done'}
                                                                      className="dropdown-item"
                                                                      style={item.status === null ? {
                                                                          backgroundColor: "#f5f5f8",
                                                                          height: '100px'
                                                                      } : {backgroundColor: "white", height: '100px'}}
                                                                      onClick={() => {
                                                                          setStatus(item.id).then((res) => {
                                                                              toggleFlag()
                                                                          })
                                                                      }}>
                                                                    <div style={{
                                                                        fontWeight: 'bold',
                                                                        paddingTop: '1%'
                                                                    }}>Shop của bạn {item.id}</div>
                                                                    <div className="dropdown"
                                                                         style={{display: 'flex', paddingTop: '1%'}}>
                                                                        <div>
                                                                            {item?.avatar !== null ?
                                                                                <img src={item?.avatar} style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%'
                                                                                }} alt=""/>
                                                                                :
                                                                                <i className="fa-solid fa-user" style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                    color: '#c6c7cb',
                                                                                    fontSize: '30px'
                                                                                    ,
                                                                                    textAlign: 'center',
                                                                                    marginTop: '8%'
                                                                                }}></i>
                                                                            }
                                                                        </div>
                                                                        <div style={{
                                                                            marginLeft: '3%',
                                                                            width: '250px',
                                                                            color: 'black',
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis'
                                                                        }}>
                                                                        <span style={{
                                                                            display: 'block',
                                                                            width: '100%',
                                                                            whiteSpace: 'normal'
                                                                        }}>
                                                                            Đơn hàng 2903VDC02{item?.bill?.id} đã được giao thành công
                                                                        </span>
                                                                        </div>
                                                                        <div
                                                                            style={{marginTop: '10%'}}>{FormatTime(item.createAt)}</div>
                                                                    </div>
                                                                </Link>
                                                            ) : (
                                                                <Link to={'/product/' + item?.product?.id}
                                                                      className="dropdown-item"
                                                                      style={item.status === null ? {
                                                                          backgroundColor: "#f5f5f8",
                                                                          height: '100px'
                                                                      } : {backgroundColor: "white", height: '100px'}}
                                                                      onClick={() => {
                                                                          setStatus(item.id).then((res) => {
                                                                              toggleFlag()
                                                                          })
                                                                      }}>
                                                                    <div style={{
                                                                        fontWeight: 'bold',
                                                                        paddingTop: '1%'
                                                                    }}>Shop của bạn {item.id}</div>
                                                                    <div className="dropdown"
                                                                         style={{display: 'flex', paddingTop: '1%'}}>
                                                                        <div>
                                                                            {item?.avatar !== null ?
                                                                                <img src={item?.avatar} style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%'
                                                                                }} alt=""/>
                                                                                :
                                                                                <i className="fa-solid fa-user" style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                    color: '#c6c7cb',
                                                                                    fontSize: '30px'
                                                                                    ,
                                                                                    textAlign: 'center',
                                                                                    marginTop: '8%'
                                                                                }}></i>
                                                                            }
                                                                        </div>
                                                                        <div style={{
                                                                            marginLeft: '3%',
                                                                            width: '250px',
                                                                            color: 'black',
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis'
                                                                        }}>
                                                                        <span style={{
                                                                            display: 'block',
                                                                            width: '100%',
                                                                            whiteSpace: 'normal'
                                                                        }}>
                                                                            {item?.account?.username} đã đánh giá về sản phẩm của bạn
                                                                        </span>
                                                                        </div>
                                                                        <div
                                                                            style={{marginTop: '10%'}}>{FormatTime(item.createAt)}</div>
                                                                    </div>
                                                                </Link>
                                                            )}


                                                        </>
                                                    ) : (
                                                        <>
                                                            {item?.content === 'Đơn hàng được xác nhận' ? (
                                                                <Link
                                                                    to={'/user-management/order/shipping'}
                                                                    className="dropdown-item"
                                                                    style={
                                                                        item.status === null
                                                                            ? {
                                                                                backgroundColor: "#f5f5f8",
                                                                                height: '80px'
                                                                            }
                                                                            : {backgroundColor: "white", height: '80px'}
                                                                    }
                                                                    onClick={() => {
                                                                        setStatus(item.id).then((res) => {
                                                                            toggleFlag();
                                                                        });
                                                                    }}>
                                                                    <div className="dropdown"
                                                                         style={{display: 'flex', paddingTop: '1%'}}>
                                                                        <div>
                                                                            {item?.avatar !== null ? (
                                                                                <img src={item?.shop?.avatar} style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                }} alt=""/>
                                                                            ) : (
                                                                                <i className="fa-solid fa-user" style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                    color: '#c6c7cb',
                                                                                    fontSize: '30px'
                                                                                    ,
                                                                                    textAlign: 'center',
                                                                                    marginTop: '8%'
                                                                                }}></i>
                                                                            )}
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                marginLeft: '3%',
                                                                                width: '250px',
                                                                                color: 'black',
                                                                                whiteSpace: 'nowrap',
                                                                                overflow: 'hidden',
                                                                                textOverflow: 'ellipsis',
                                                                            }}>
                                                                                 <span style={{
                                                                                     display: 'block',
                                                                                     width: '100%',
                                                                                     whiteSpace: 'normal',
                                                                                 }}>
                                                                                        Đơn hàng 2903VDC02{item?.bill?.id} của bạn đã được xác nhận
                                                                                 </span>
                                                                        </div>
                                                                        <div
                                                                            style={{marginTop: '10%'}}>{FormatTime(item.createAt)}</div>
                                                                    </div>
                                                                </Link>
                                                            ) : item?.content === 'Đơn hàng bị từ chối' ? (
                                                                <Link
                                                                    to={'/user-management/order/cancelShop'}
                                                                    className="dropdown-item"
                                                                    style={
                                                                        item.status === null
                                                                            ? {
                                                                                backgroundColor: "#f5f5f8",
                                                                                height: '80px'
                                                                            }
                                                                            : {backgroundColor: "white", height: '80px'}
                                                                    }
                                                                    onClick={() => {
                                                                        setStatus(item.id).then((res) => {
                                                                            toggleFlag();
                                                                        });
                                                                    }}>
                                                                    <div className="dropdown"
                                                                         style={{display: 'flex', paddingTop: '1%'}}>
                                                                        <div>
                                                                            {item?.avatar !== null ? (
                                                                                <img src={item?.shop?.avatar} style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                }} alt=""/>
                                                                            ) : (
                                                                                <i className="fa-solid fa-user" style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                    color: '#c6c7cb',
                                                                                    fontSize: '30px'
                                                                                    ,
                                                                                    textAlign: 'center',
                                                                                    marginTop: '8%'
                                                                                }}></i>
                                                                            )}
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                marginLeft: '3%',
                                                                                width: '250px',
                                                                                color: 'black',
                                                                                whiteSpace: 'nowrap',
                                                                                overflow: 'hidden',
                                                                                textOverflow: 'ellipsis',
                                                                            }}>
                                                                                 <span style={{
                                                                                     display: 'block',
                                                                                     width: '100%',
                                                                                     whiteSpace: 'normal',
                                                                                 }}>
                                                                                        Đơn hàng 2903VDC02{item?.bill?.id} đã bị từ chối vì lý do {item?.bill?.reason}
                                                                                 </span>
                                                                        </div>
                                                                        <div
                                                                            style={{marginTop: '10%'}}>{FormatTime(item.createAt)}</div>
                                                                    </div>
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    to={'/product/' + item?.product?.id}
                                                                    className="dropdown-item"
                                                                    style={
                                                                        item.status === null
                                                                            ? {
                                                                                backgroundColor: "#f5f5f8",
                                                                                height: '80px'
                                                                            }
                                                                            : {backgroundColor: "white", height: '80px'}
                                                                    }
                                                                    onClick={() => {
                                                                        setStatus(item.id).then((res) => {
                                                                            toggleFlag();
                                                                        });
                                                                    }}>
                                                                    <div className="dropdown"
                                                                         style={{display: 'flex', paddingTop: '1%'}}>
                                                                        <div>
                                                                            {item?.avatar !== null ? (
                                                                                <img src={item?.shop?.avatar} style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                }} alt=""/>
                                                                            ) : (
                                                                                <i className="fa-solid fa-user" style={{
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    borderRadius: '50%',
                                                                                    color: '#c6c7cb',
                                                                                    fontSize: '30px'
                                                                                    ,
                                                                                    textAlign: 'center',
                                                                                    marginTop: '8%'
                                                                                }}></i>
                                                                            )}
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                marginLeft: '3%',
                                                                                width: '250px',
                                                                                color: 'black',
                                                                                whiteSpace: 'nowrap',
                                                                                overflow: 'hidden',
                                                                                textOverflow: 'ellipsis',
                                                                            }}>
                                                                                 <span style={{
                                                                                     display: 'block',
                                                                                     width: '100%',
                                                                                     whiteSpace: 'normal',
                                                                                 }}>
                                                                                      {item?.shop?.name} Đã phản hồi đánh giá của bạn
                                                                                 </span>
                                                                        </div>
                                                                        <div
                                                                            style={{marginTop: '10%'}}>{FormatTime(item.createAt)}</div>
                                                                    </div>
                                                                </Link>
                                                            )}
                                                        </>

                                                    )}
                                                </React.Fragment>
                                            ))}


                                        </div> :
                                        <div className="dropdown-menu m-0 noti">
                                            <div style={{textAlign: 'center', fontSize: '15px', marginTop: '60%'}}>Không
                                                có thông báo
                                            </div>
                                        </div>
                                    }
                                    {/*User*/}
                                    <div style={{
                                        display: 'flex',
                                        marginTop: '17%',
                                        marginBottom: '-24%',

                                    }}>


                                        <div className="nav-item dropdown" style={{
                                            borderBottom: 'none',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            marginLeft: '5px',
                                            marginRight: '5%'
                                        }}>
                                            <a href="#" className=" nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                                {avatar === null ?
                                                    <i className="fa-regular fa-user" style={{
                                                        color: '#bcc5d7',
                                                        fontSize: '19px',
                                                        marginLeft: '7px',
                                                        marginTop: '5px'
                                                    }}></i>
                                                    : <img src={avatar} alt="" style={{
                                                        borderRadius: '50%',
                                                        width: '30px',
                                                        height: '30px'
                                                    }}/>
                                                }
                                            </a>
                                            {acc !== null && account !== null ?
                                                account.authorities[0].authority === 'ROLE_SHOP' ?
                                                    <div className="dropdown-menu m-0">
                                                        <Link to={'/user-management'} className="dropdown-item">Hồ
                                                            sơ</Link>
                                                        <Link to={'/shop-management'} className="dropdown-item">Shop
                                                            của
                                                            tôi</Link>
                                                        <Dropdown.Divider/>
                                                        <Link to="/login" className="dropdown-item" onClick={() => {
                                                            logout()
                                                            toast.success("bạn đã đăng xuất ", {autoClose: 700});
                                                            localStorage.clear()
                                                        }}>Đăng xuất</Link>
                                                    </div>
                                                    :
                                                    <div className="dropdown-menu m-0">
                                                        <Link to={'/user-management'} className="dropdown-item">Hồ
                                                            sơ</Link>
                                                        <Dropdown.Divider/>
                                                        <Link to="/login" className="dropdown-item" onClick={() => {
                                                            logout()
                                                            toast.success("bạn đã đăng xuất ", {autoClose: 700});
                                                            localStorage.clear()
                                                        }}>Đăng xuất</Link>
                                                    </div>

                                                :
                                                <div className="dropdown-menu m-0">
                                                    <Link to={'/login'} className="dropdown-item" onClick={() => {
                                                        logout()
                                                    }}>Đăng nhập</Link>
                                                    <Link to={'/register'} className="dropdown-item" onClick={() => {
                                                        logout()
                                                    }}>Đăng ký</Link>
                                                </div>
                                            }
                                        </div>
                                        {username !== null ? <div style={{
                                            marginTop: '20px',
                                            fontSize: '15px',
                                            width: '80px',
                                            fontFamily: 'Font Awesome 6 Free',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '10ch',
                                        }}>
                                            {username}
                                        </div> : ''}
                                    </div>
                                </li>
                                <li style={{marginBottom: '-14%'}}>
                                    <Link to="/register">
                                        <span style={!checkLogin ? {display: 'none'} : {
                                            color: 'white',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            margin: '-5px 7px 0 7px'
                                        }}></span>
                                        <span className='top-link-itm-txt'
                                              style={!checkLogin ? {display: 'none'} : {}}>Đăng ký</span>
                                    </Link>
                                </li>
                                <li style={{marginBottom: '-14%'}}>
                                    <Link to="/login">
                                        <span style={!checkLogin ? {display: 'none'} : {
                                            color: 'white',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            margin: '-5px 7px 0 7px'
                                        }}>|</span>
                                        <span className='top-link-itm-txt' onClick={props.a}
                                              style={!checkLogin ? {display: 'none'} : {}}>Đăng nhập</span>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className='header1-cnt-bottom'>
                        <Navbar/>
                    </div>
                </div>

                <div className="chat-icon">
                    <Link to="/chat">
                        <i className="fab fa-facebook-messenger"></i>
                    </Link>

                </div>
            </div>
        </header>
    )

}

export default Header
