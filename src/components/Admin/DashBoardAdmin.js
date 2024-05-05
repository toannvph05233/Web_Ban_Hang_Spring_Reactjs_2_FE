import React, {useContext, useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import {AppContext} from "../../Context/AppContext";
import Swal from "sweetalert2";

function DashBoardAdmin() {
    let acc = JSON.parse(localStorage.getItem('accountLogin'));
    const {isFlag} = useContext(AppContext);
    useEffect(() => {
        if (acc === null || (acc.authorities[0].authority !== 'ROLE_ADMIN')) {
            Swal.fire({
                title: 'Thông báo!',
                text: 'Bạn không phải là ADMIN',
                icon: 'warning', // success, error, warning, info, question
            })

        }
    }, [isFlag]);

    return (

        <div className="dashboard">
            <nav className="nav">
                {/* ... navigation links ... */}

                {acc.authorities[0].authority !== 'ROLE_ADMIN' ?

                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link  className={'cekkon'} to="/admin/profile">Thông tin</Link>
                        </li>
                        <li className="nav__item">
                            <Link className={'cekkon'} to="/">Quay lại home</Link>
                        </li>
                    </ul> :
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link  className={'cekkon'} to="/admin/profile">Thông tin</Link>
                        </li>
                        <li className="nav__item">
                            <Link className={'cekkon'} to="/admin/list-account">Quản lý tài khoản</Link>
                        </li>

                    </ul>}

            </nav>
            <main className="main-content">
                {/* Outlet will render the nested route as the main content */}
                <Outlet/>
            </main>
        </div>
    );
}

export default DashBoardAdmin;
