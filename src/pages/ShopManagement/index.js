import React, {useContext, useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import './index.scss';
import {findShop} from "./service/ProfileService";
import {AppContext} from "../../Context/AppContext";
import {toast} from "react-toastify";
import Swal from "sweetalert2";

function DashBoard() {
    let acc = localStorage.getItem('account');
    const [idShop ,setIdShop] = useState(null) ;
    const {isFlag} = useContext(AppContext);
    useEffect(() => {
        if (acc !== null) {
            findShop(acc).then((res) => {
                setIdShop(res.account.id) ;

            }).catch( () =>{
                Swal.fire({
                    title: 'Thông báo!',
                    text: 'Bạn chưa có shop vui long đăng kí để xác nhận',
                    icon: 'warning', // success, error, warning, info, question
                    confirmButtonText: 'Đăng ký ngay',
                })
            })
            }
    }, [isFlag]);

    return (

    <div className="dashboard">
        <nav className="nav">
            {/* ... navigation links ... */}

                {idShop === null ?
                    <ul className="nav__list">
                    <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/profile">Thông tin</Link>
                </li>   </ul>:
                        <ul className="nav__list">

                <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/order-management" >Quản lý đơn hàng</Link>
                </li>
                <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/list-product">Danh sách Sản phẩm</Link>
                </li>
                <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/report">Báo cáo doanh thu</Link>
                </li>
                <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/profile">Thông tin</Link>
                </li>  </ul> }

        </nav>
        <main className="main-content">
            {/* Outlet will render the nested route as the main content */}
            <Outlet />
        </main>
    </div>
    );
}

export default DashBoard;
