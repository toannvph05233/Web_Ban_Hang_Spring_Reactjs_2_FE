import React from 'react';
import { Link, Outlet} from "react-router-dom";
import './index.scss';

function Index() {
    return (

        <div className="dashboard" >
            <nav className="nav" >
                {/* ... navigation links ... */}
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link className={'cekkonn'} to="/user-management/profile" >Thông tin</Link>
                    </li>
                    <li className="nav__item">
                        <Link className={'cekkonn'} to="/user-management/change-password">Đổi mật khẩu</Link>
                    </li>
                    <li className="nav__item">
                        <Link className={'cekkonn'} to="/user-management/order">Quản lý đơn hàng</Link>
                    </li>
                </ul>
            </nav>
            <main className="main-content">
                {/* Outlet will render the nested route as the main content */}
                <Outlet />
            </main>
        </div>
    );
}

export default Index;
