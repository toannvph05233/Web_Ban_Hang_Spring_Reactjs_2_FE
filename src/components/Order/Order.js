import React, { useContext, useEffect, useState } from "react";
import { listBillDetailByShop } from "../../service/OrderService";
import { STATUS } from "../../utils/status";
import Loader from "../Loader/Loader";
import BillList from "./BillList";
import { userCheck } from "../../service/UserService";
import { AppContext } from "../../Context/AppContext";

export default function Order(props) {
    const idAcc = localStorage.getItem("account");
    const [user, setUser] = useState([]);
    const [billDetail, setBillDetail] = useState([]);
    const { isFlag } = useContext(AppContext);

    useEffect(() => {
        userCheck(idAcc).then(res => {
            setUser(res.data);
        });

        listBillDetailByShop(idAcc).then(res => {
            setBillDetail(res.data);
        });
    }, [isFlag]);

    const listBillByUser = user.map(() => []);

    if (props.name === 'Tất cả') {
        if (billDetail.length > 0) {
            for (let i = 0; i < user.length; i++) {
                let product = [];
                for (let j = 0; j < billDetail.length; j++) {
                    if (billDetail[j]?.bill?.account?.username === user[i]) {
                        product.push(billDetail[j]);
                    }
                }
                listBillByUser[i] = product;
            }
        }
    } else {
        if (billDetail.length > 0) {
            for (let i = 0; i < user.length; i++) {
                let product = [];
                for (let j = 0; j < billDetail.length; j++) {
                    if (billDetail[j]?.bill?.account?.username === user[i] && billDetail[j]?.bill?.status === props.name) {
                        product.push(billDetail[j]);
                    }
                }
                listBillByUser[i] = product;
            }
        }
    }

    const checkEmpty = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].length > 0) {
                return true;
            }
        }
        return false;
    };

    return (
        <div>
            {checkEmpty(listBillByUser) ? (
                <div style={{ backgroundColor: '#f6f6f6', fontSize: '15px', marginLeft: '2%', marginRight: '2%' }}>
                    <div style={{
                        display: 'flex',
                        backgroundColor: 'rgb(232, 232, 232)',
                        marginBottom: '15px',
                        fontSize: '17px',
                        height: '55px'
                    }}>
                        <div style={{ marginLeft: '25px', marginTop: '12px' }}>Sản phẩm</div>
                        <div style={{ marginLeft: '390px', marginTop: '12px' }}>
                            <p>Tổng đơn hàng</p>
                        </div>
                        <div style={{ marginLeft: '68px', marginTop: '12px' }}>
                            <p>Trạng thái</p>
                        </div>
                        <div style={{ marginLeft: '100px', marginTop: '12px' }}>
                            <p>Thao tác</p>
                        </div>
                    </div>
                    <div>
                        {listBillByUser.map((item, index) => (
                            (item.length > 0) ?
                                <div className='' style={{ marginLeft: '20px' }} key={index}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>Khách hàng
                                            : {item[0]?.bill?.account?.username} - {item[0]?.bill?.phone}</div>
                                        <div>Địa chỉ :{item[0]?.bill?.address}
                                            ,{item[0]?.bill?.wards?.name}
                                            ,{item[0]?.bill?.wards?.district?.name}
                                            ,{item[0]?.bill?.wards?.district?.city?.name} </div>
                                    </div>
                                    {item === STATUS.LOADING ? <Loader /> : <BillList items={item} />}
                                </div>
                                :
                                <div key={index}></div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div style={{ marginLeft: '42.5%', marginTop: '130px' }}><img
                        style={{ width: "160px", height: "77.6667px" }}
                        src="https://i.pinimg.com/736x/67/26/e3/6726e38e407a4e2e9bb3a6fd3054b242.jpg" alt="" /></div>
                    <div style={{
                        fontSize: '18px',
                        color: 'rgba(0,0,0,.8)',
                        textAlign: 'center',
                        paddingTop: '10px'
                    }}>Chưa có đơn hàng
                    </div>
                </div>
            )}
        </div>
    );
}
