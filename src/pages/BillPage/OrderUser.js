import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import "./OrderUser.scss"
function OrderUser() {

    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(null);
    const [initialLink, setInitialLink] = useState(null);


    const links = [
        { to: "/user-management/order/confirm", label: 'Chờ xác nhận' },
        { to: "/user-management/order/shipping", label: 'Đang giao' },
        { to: "/user-management/order/done", label: 'Đã giao' },
        { to: "/user-management/order/cancel", label: 'Đơn hủy' },
        { to: "/user-management/order/cancelShop", label: 'Đơn bị hủy' },



    ];

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setSelectedLink(path);
    }, [location.pathname]);

    return (
        <div style={{}} >
            <nav className={'naV'}>
                <ul className="nav-list" style={{}} >
                    {links.map((link, index) => (
                        <li key={index} style={{marginLeft:"65px"}} className={`nav-item 
                        ${selectedLink === link.to.split('/').pop() ? 'selected' : (initialLink === link.to.split('/').pop() ? 'selected' : '')}`}>
                            <Link to={link.to} className={`nav-link ${selectedLink === link.to.split('/').pop() ? 'selected' : (initialLink === link.to.split('/').pop() ? 'selected' : '')}`}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>


            <main className="main-content">
                {/* Outlet will render the nested route as the main content */}
                <Outlet  />
            </main>
        </div>
    );
}

export default OrderUser;
